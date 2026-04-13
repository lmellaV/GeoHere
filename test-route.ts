import { NextRequest } from 'next/server';
import { POST } from './src/app/api/auth/login/route';

async function test() {
  const req = new NextRequest('http://localhost:3000/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username: 'Casona Nueva', password: 'admin123' })
  });
  
  const res = await POST(req);
  console.log('Status:', res.status);
  console.log('Response:', await res.json());
}

test().catch(console.error);
