import { NextRequest, NextResponse } from 'next/server';
import { saveFaq, getFaqs } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const adminEmail = body.adminEmail || 'admin@alfaridzi.dev';
    const faq = body.faq;

    if (!faq || !faq.q || !faq.a) {
      return NextResponse.json({ error: 'Pertanyaan dan jawaban wajib diisi' }, { status: 400 });
    }

    const saved = await saveFaq(faq, adminEmail);
    return NextResponse.json({ success: true, faq: saved });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error' }, { status: 500 });
  }
}
