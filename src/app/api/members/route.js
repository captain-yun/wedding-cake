import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jsonDb from '@/lib/jsonDb';

export async function GET() {
  try {
    const members = await jsonDb.findMany('members', 'members');
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const member = await jsonDb.create('members', 'members', {
      phone: body.phone,
      gender: body.gender,
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create member' },
      { status: 500 }
    );
  }
}


// export async function POST(request) {
//   try {
//     const body = await request.json();
    
//     const member = await prisma.member.create({
//       data: {
//         phone: body.phone,
//         gender: body.gender,
//       },
//     });
    
//     return NextResponse.json(member, { status: 201 });
//   } catch (error) {
//     console.error('Database error:', error);
    
//     return NextResponse.json(
//       { error: error.message || 'Failed to create member' },
//       { status: 500 }
//     );
//   }
// } 