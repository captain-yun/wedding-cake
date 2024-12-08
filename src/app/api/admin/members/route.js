import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(members);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
} 