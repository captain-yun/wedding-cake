import { PrismaClient } from '@prisma/client';

// 임시 더미 클라이언트
const dummyPrismaClient = {
  work: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async () => ({
      id: 'dummy',
      title: '',
      content: '',
      client: '',
      period: '',
      createdAt: new Date()
    })
  }
};

let prisma;

try {
  if (process.env.USE_DUMMY_DATA === 'true') {
    prisma = dummyPrismaClient;
  } else {
    if (process.env.NODE_ENV === 'production') {
      prisma = new PrismaClient();
    } else {
      if (!global.prisma) {
        global.prisma = new PrismaClient();
      }
      prisma = global.prisma;
    }
  }
} catch (error) {
  console.error('Prisma initialization failed:', error);
  prisma = dummyPrismaClient;
}

export default prisma;