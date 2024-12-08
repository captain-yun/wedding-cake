import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const member = await prisma.member.create({
      data: {
        phone: body.phone,
        gender: body.gender,
      },
    });
    
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to create member' },
      { status: 500 }
    );
  }
} 