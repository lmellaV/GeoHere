import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { adminMessages } from '@/db/schema';
import { eq, count, and } from 'drizzle-orm';
import { authenticateAdmin } from '@/lib/auth-utils';
import { withObservability } from '@/lib/observability';

async function handler(req: NextRequest) {
  const auth = await authenticateAdmin(req);
  if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const result = await db.select({ val: count() })
      .from(adminMessages)
      .where(eq(adminMessages.status, 'pending'));

    return NextResponse.json({ 
      success: true, 
      count: result[0]?.val || 0 
    });
  } catch (error) {
    console.error('Error al contar mensajes pendientes:', error);
    return NextResponse.json({ success: false, message: 'Error al obtener conteo' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return withObservability(handler)(req);
}
