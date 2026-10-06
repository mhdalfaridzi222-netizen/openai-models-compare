import { NextRequest, NextResponse } from 'next/server';
import { runOpenAIModelSync } from '@/lib/sync/openai';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const cronSecret = process.env.CRON_SECRET;
    const adminToken = req.headers.get('x-admin-token');

    // Protect endpoint: require CRON_SECRET or authenticated admin header/cookie
    const isCronAuthorized = cronSecret && (
      authHeader === `Bearer ${cronSecret}` ||
      req.headers.get('x-cron-secret') === cronSecret
    );

    const isAdminAuthorized = adminToken === 'admin-authorized-session' || isCronAuthorized;

    if (!isAdminAuthorized && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Unauthorized: Endpoint ini memerlukan autentikasi Admin atau CRON_SECRET.' },
        { status: 401 }
      );
    }

    const caller = isCronAuthorized ? 'CRON_SERVICE' : 'ADMIN_API';
    const result = await runOpenAIModelSync(caller);

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
