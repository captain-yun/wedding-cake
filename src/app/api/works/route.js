import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    
    console.log('Received data:', body);
    
    const work = await prisma.work.create({
      data: {
        title: body.title,
        content: body.content,
        client: body.client,
        period: body.period,
      },
    });
    
    return NextResponse.json(work, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to create work' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const works = await prisma.work.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(works);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch works' },
      { status: 500 }
    );
  }
}
