import { describe, it, expect, vi } from 'vitest';
import { GET as adminCompaniesGet } from '@/app/api/admin/companies/route';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'test_secret';

describe('Admin API Endpoints Access Control', () => {
  it('should deny access to companies without token', async () => {
    const req = new NextRequest('http://localhost:3000/api/admin/companies', {
      method: 'GET',
    });

    const res = await adminCompaniesGet(req);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data.success).toBe(false);
    expect(data.message).toContain('No token provided');
  });

  it('should deny access to companies with user token', async () => {
    const userToken = jwt.sign({ id: 'user_1', role: 'user' }, JWT_SECRET);
    const req = new NextRequest('http://localhost:3000/api/admin/companies', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${userToken}` },
    });

    const res = await adminCompaniesGet(req);
    const data = await res.json();

    expect(res.status).toBe(403);
    expect(data.success).toBe(false);
    expect(data.message).toContain('Admin only');
  });

  it('should allow access to companies with admin token', async () => {
    const adminToken = jwt.sign({ id: 'admin_1', role: 'admin' }, JWT_SECRET);
    const req = new NextRequest('http://localhost:3000/api/admin/companies', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${adminToken}` },
    });

    const res = await adminCompaniesGet(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.companies).toBeDefined();
  });
});
