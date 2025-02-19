import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  const saltRounds = 6;

  const users = await prisma.user.createMany({
    data: [
      {
        id: 'c1a5e3c8-8240-41c1-8b0b-8cfd94b50d3a',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: await hash('alicepassword123', saltRounds), // Senha real: 'alicepassword123',
      },
      {
        id: 'd9f2e709-9b6f-4e3b-b8d5-218b3b6f9d8d',
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: await hash('bobpassword456', saltRounds), // Senha real: 'bobpassword456',
      },
      {
        id: 'ec69f192-6d5e-49f6-a09b-6a57c3282dcf',
        name: 'Charlie Davis',
        email: 'charlie@example.com',
        password: await hash('charliepassword789', saltRounds), // Senha real: 'charliepassword789',
      },
      {
        id: 'f3a61b62-e1d6-42d2-9bbf-f1e6c0e52b91',
        name: 'Diana Prince',
        email: 'diana@example.com',
        password: await hash('dianapassword321', saltRounds), // Senha real: 'dianapassword321',
      },
      {
        id: 'a2d67db2-6d5e-49f6-a19b-6a57c3283dac',
        name: 'Eve Thompson',
        email: 'eve@example.com',
        password: await hash('evepassword654', saltRounds), // Senha real: 'evepassword654',
      },
      {
        id: 'b5f7f0a9-5f6e-41fc-baa8-8fd842fd738d',
        name: 'Frank Castle',
        email: 'frank@example.com',
        password: await hash('frankpassword987', saltRounds), // Senha real: 'frankpassword987',
      },
      {
        id: 'e4b7f2a4-22d6-48d6-a16a-9b5e94b61d23',
        name: 'Grace Hopper',
        email: 'grace@example.com',
        password: await hash('gracepassword852', saltRounds), // Senha real: 'gracepassword852',
      },
      {
        id: 'f4c8e2b1-47c5-4d7a-b18b-3a2d929c64f7',
        name: 'Henry Cavill',
        email: 'henry@example.com',
        password: await hash('henrypassword963', saltRounds), // Senha real: 'henrypassword963',
      },
      {
        id: 'caa8b54a-eb5e-4134-8ae2-a3946a428ec7',
        name: 'Irene Adler',
        email: 'irene@example.com',
        password: await hash('irenepassword741', saltRounds), // Senha real: 'irenepassword741',
      },
      {
        id: 'h1b8f2c5-61f7-4d8d-b19f-2a5e92b64f8d',
        name: 'John Wick',
        email: 'john@example.com',
        password: await hash('johnpassword369', saltRounds), // Senha real: 'johnpassword369',
      },
    ],
  });

  console.debug('Users created successfully');

  return users;
}

async function getTestUsers() {
  const users = await seed();

  console.debug('Users retrieved successfully');

  await prisma.$disconnect();

  return users;
}

export { getTestUsers };
