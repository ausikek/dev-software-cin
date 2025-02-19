import { UserRepository } from '@/app/api/user/user-repository';
import { prismaMock } from '../../prisma/singleton';

beforeEach(() => {});

describe('User repository tests suite', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository(prismaMock);
  });

  const user = {
    id: '1',
    name: 'Aline',
    email: 'aan4@cin.ufpe.br',
    password: 'senha123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('Should create a new user', async () => {
    prismaMock.user.create.mockResolvedValue(user);

    expect(await userRepository.create(user)).toEqual({
      id: '1',
      name: 'Aline',
      email: 'aan4@cin.ufpe.br',
      password: 'senha123',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('Should read all users', async () => {
    const users = [
      {
        id: '1',
        name: 'Aline',
        email: 'aan4@cin.ufpe.br',
        password: 'senha123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Breno',
        email: 'bonof@cin.ufpe.br',
        password: 'senha123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    prismaMock.user.findMany.mockResolvedValue(users);

    expect(await userRepository.readAll()).toEqual([
      {
        id: '1',
        name: 'Aline',
        email: 'aan4@cin.ufpe.br',
        password: 'senha123',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
      {
        id: '2',
        name: 'Breno',
        email: 'bonof@cin.ufpe.br',
        password: 'senha123',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ]);
  });

  it('Should read a user by id', async () => {
    prismaMock.user.findUnique.mockResolvedValue(user);

    expect(await userRepository.read('1')).toEqual({
      id: '1',
      name: 'Aline',
      email: 'aan4@cin.ufpe.br',
      password: 'senha123',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('Should read a user by email', async () => {
    prismaMock.user.findUnique.mockResolvedValue(user);

    expect(await userRepository.readByEmail('aan4@cin.ufpe.br')).toEqual({
      id: '1',
      name: 'Aline',
      email: 'aan4@cin.ufpe.br',
      password: 'senha123',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("Should update a user's data", async () => {
    prismaMock.user.update.mockResolvedValue(user);

    expect(await userRepository.update(user, '1')).toEqual({
      id: '1',
      name: 'Aline',
      email: 'aan4@cin.ufpe.br',
      password: 'senha123',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should delete a user's data", async () => {
    prismaMock.user.delete.mockResolvedValue(user);

    expect(await userRepository.delete('1')).toEqual({
      id: '1',
      name: 'Aline',
      email: 'aan4@cin.ufpe.br',
      password: 'senha123',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
