import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany(); // optional: wipe old users

  await prisma.user.create({
    data: {
      email: 'client@example.com',
      password: '123456', // ✅ plain password
      name: 'Ali Client',
      phone: '0555123456',
      role: 'CLIENT',
    },
  });

  await prisma.user.create({
    data: {
      email: 'provider@example.com',
      password: '123456', // ✅ plain password
      name: 'Nour Provider',
      phone: '0666987654',
      role: 'PROVIDER',
    },
  });
}

main().finally(() => prisma.$disconnect());
