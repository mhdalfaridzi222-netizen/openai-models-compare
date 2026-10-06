import { NextRequest, NextResponse } from 'next/server';
import { saveOrUpdateArticle } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const adminEmail = body.adminEmail || 'admin@alfaridzi.dev';
    const articleData = body.article;

    if (!articleData || !articleData.title || !articleData.slug) {
      return NextResponse.json(
        { error: 'Judul dan slug artikel wajib diisi.' },
        { status: 400 }
      );
    }

    const saved = await saveOrUpdateArticle(articleData, adminEmail);
    return NextResponse.json({ success: true, article: saved });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Gagal menyimpan artikel' },
      { status: 500 }
    );
  }
}
