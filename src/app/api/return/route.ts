/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { returnResource } from '@/lib/dbActions';

export async function POST(req: Request) {
  try {
    const { resourceId } = await req.json();
    const result = await returnResource(resourceId);

    if (result.success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: result.error });
  } catch (error) {
    console.error('Return API error:', error);
    return new NextResponse('Failed to return resource', { status: 500 });
  }
}
