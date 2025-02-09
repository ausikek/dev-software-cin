import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ['info', 'warn', 'error'] });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

prisma
  .$connect()
  .then(() => {
    console.info('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database', error);
  });

process.on('SIGINT', async () => {
  console.error('Shutting down, goodbye...');
  await prisma.$disconnect();
  process.exit();
});

export default prisma;
