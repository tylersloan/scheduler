import { NextRequest, NextResponse } from 'next/server';
import PROVIDERS_DB from '@/app/data/providers';

export async function GET(request, { params }) {
  let data = PROVIDERS_DB;
  if (params?.id) {
    data = PROVIDERS_DB.find((provider) => provider.id === parseInt(params.id));
  }
  return NextResponse.json({
    data,
  });
}
