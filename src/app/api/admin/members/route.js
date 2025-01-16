import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { jsonDb } from '@/lib/jsonDb';

import { NextResponse } from 'next/server';
import { jsonDb } from '@/lib/jsonDb';

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
// export async function GET() {
//   try {
//     const members = await prisma.member.findMany({
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });
    
//     return NextResponse.json(members);
//   } catch (error) {
//     console.error('Database error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch members' },
//       { status: 500 }
//     );
//   }
// } 