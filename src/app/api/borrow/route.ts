/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { borrowResource } from '@/lib/dbActions';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { resourceId, userEmail } = await req.json();

    // Count existing physical items this user has
    const currentCount = await prisma.resource.count({
      where: {
        owner: userEmail,
        type: 'physical',
      },
    });

    if (currentCount >= 5) {
      return NextResponse.json({
        success: false,
        error: 'You cannot borrow more than 5 equipment items.',
      });
    }

    const result = await borrowResource(resourceId, userEmail);
    return NextResponse.json(result);
  } catch (error) {
    console.error('API borrow error:', error);
    return new NextResponse('Failed to borrow', { status: 500 });
  }
}
