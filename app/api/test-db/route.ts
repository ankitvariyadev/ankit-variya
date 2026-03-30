import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Simple connection test
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    const userCount = await prisma.user.count();

    return NextResponse.json({
      status: 'connected',
      database: 'Supabase',
      userCount,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
      code: error.code,
      meta: error.meta,
    }, { status: 500 });
  }
}
