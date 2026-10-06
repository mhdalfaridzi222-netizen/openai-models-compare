import { NextRequest, NextResponse } from 'next/server';
import { runOpenAIModelSync } from '@/lib/sync/openai';
import { verifyAndSyncPricing } from '@/lib/sync/pricing';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // Verify Vercel Cron header or Bearer secret
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized: Invalid CRON_SECRET' }, { status: 401 });
    }

    const modelResult = await runOpenAIModelSync('VERCEL_CRON');
    const pricingResult = await verifyAndSyncPricing('VERCEL_CRON');

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      modelsSync: modelResult,
      pricingSync: pricingResult
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Cron execution failed' }, { status: 500 });
  }
}
