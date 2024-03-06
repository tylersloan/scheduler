import { NextRequest, NextResponse } from 'next/server';
import CLIENTS_DB from '@/app/data/clients';

export async function GET(request, { params }) {
  let data = CLIENTS_DB;
  if (params?.id) {
    data = CLIENTS_DB.find((client) => client.id === parseInt(params.id));
  }
  return NextResponse.json({
    data,
  });
}
