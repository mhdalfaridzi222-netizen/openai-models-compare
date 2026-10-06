import { NextRequest, NextResponse } from 'next/server';
import { saveOrUpdateModel } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const adminEmail = body.adminEmail || 'admin@alfaridzi.dev';
    const modelData = body.model;

    if (!modelData || !modelData.name || !modelData.modelId) {
      return NextResponse.json(
        { error: 'Name dan API Model ID wajib diisi.' },
        { status: 400 }
      );
    }

    const saved = await saveOrUpdateModel(modelData, adminEmail);
    return NextResponse.json({ success: true, model: saved });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Gagal menyimpan model' },
      { status: 500 }
    );
  }
}
