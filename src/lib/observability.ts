import { NextRequest, NextResponse } from 'next/server';

// ─── Observability Middleware ─────────────────────────────────
// Wraps any API handler and logs request/response info to stdout.
// Usage:  export const GET = withObservability(handler)

type Handler = (req: NextRequest, ctx?: any) => Promise<NextResponse>;

export function withObservability(handler: Handler): Handler {
  return async (req: NextRequest, ctx?: any) => {
    const start = performance.now();
    const method = req.method;
    const path = new URL(req.url).pathname;
    const reqId = Math.random().toString(36).slice(2, 8).toUpperCase();

    console.log(`[API] → ${method} ${path}  reqId=${reqId}`);

    let res: NextResponse;
    try {
      res = await handler(req, ctx);
    } catch (err: any) {
      const ms = (performance.now() - start).toFixed(1);
      console.error(`[API] ✗ ${method} ${path}  reqId=${reqId}  ${ms}ms  UNHANDLED: ${err?.message ?? err}`);
      return NextResponse.json({ success: false, message: 'Error interno del servidor' }, { status: 500 });
    }

    const ms = (performance.now() - start).toFixed(1);
    const status = res.status;
    const icon = status < 300 ? '✓' : status < 400 ? '→' : '✗';
    console.log(`[API] ${icon} ${method} ${path}  reqId=${reqId}  ${status}  ${ms}ms`);

    return res;
  };
}
