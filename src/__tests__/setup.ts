import { beforeAll, afterAll, vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock environment variables
process.env.JWT_SECRET = 'test_secret';
process.env.GEO_RADIUS = '50';

// Mock specific logic if needed
vi.mock('next/server', () => ({
  NextRequest: class MockRequest {
    headers: Headers;
    constructor(public url: string, public init?: any) {
      this.headers = new Headers(init?.headers);
    }
    async json() { return this.init?.body ? JSON.parse(this.init.body) : {}; }
  },
  NextResponse: {
    json: (body: any, init?: any) => ({
      status: init?.status || 200,
      json: () => Promise.resolve(body),
    }),
  },
}));
