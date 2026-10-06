import { NextRequest, NextResponse } from 'next/server';
import { updateSiteSettings, updateSeoSettings, updateAdSettings } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const adminEmail = body.adminEmail || 'admin@alfaridzi.dev';

    if (body.site) {
      await updateSiteSettings(body.site, adminEmail);
    }
    if (body.seo) {
      await updateSeoSettings(body.seo, adminEmail);
    }
    if (body.ads) {
      await updateAdSettings(body.ads, adminEmail);
    }

    return NextResponse.json({ success: true, message: 'Pengaturan berhasil diperbarui' });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error' }, { status: 500 });
  }
}
