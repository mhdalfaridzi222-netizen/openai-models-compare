import { NextRequest, NextResponse } from 'next/server';
import { verifyAndSyncPricing } from '@/lib/sync/pricing';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const cronSecret = process.env.CRON_SECRET;
    const adminToken = req.headers.get('x-admin-token');

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
    const result = await verifyAndSyncPricing(caller);

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
