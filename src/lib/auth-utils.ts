import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export async function authenticateAdmin(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return { error: 'No token provided', status: 401 };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role !== 'admin') {
      return { error: 'Access denied: Admin only', status: 403 };
    }
    return { user: decoded };
  } catch (err) {
    return { error: 'Invalid token', status: 403 };
  }
}

export async function authenticateUser(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return { error: 'No token provided', status: 401 };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return { user: decoded };
  } catch (err) {
    return { error: 'Invalid token', status: 403 };
  }
}
