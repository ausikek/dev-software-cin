import { UserServices } from '@/app/api/user/user-services';
import { IUserRepository } from '@/app/api/user/user-repository';

export const mockUserRepository = (): jest.Mocked<IUserRepository> => ({
  readAll: jest.fn(),
  read: jest.fn(),
  readByEmail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('User services tests suite', () => {
  let userServices: UserServices;
  let userRepositoryMocked: jest.Mocked<IUserRepository>;

  const user = {
    id: '1',
    name: 'Aline',
    email: 'aan4@cin.ufpe.br',
    password: 'senha123',
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  };

  beforeEach(() => {
    userRepositoryMocked = mockUserRepository();
    userServices = new UserServices(userRepositoryMocked);
  });

  it('should return all users', async () => {
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

    userRepositoryMocked.readAll.mockResolvedValue(users);

    const response = await userServices.readAll();

    expect(response).toEqual({
      payload: [
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
      ],
      status: 200,
    });
  });

  it('should read user by id', async () => {
    userRepositoryMocked.read.mockResolvedValue(user);

    const response = await userServices.read('1');

    expect(response).toEqual({
      payload: {
        id: '1',
        name: 'Aline',
        email: 'aan4@cin.ufpe.br',
        password: 'senha123',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
      status: 200,
    });
  });

  it('should create a new user', async () => {
    userRepositoryMocked.create.mockResolvedValue(user);

    const response = await userServices.create(user);

    expect(response).toEqual({
      payload: {
        id: '1',
        name: 'Aline',
        email: 'aan4@cin.ufpe.br',
        password: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
      status: 201,
    });
  });

  it("should update user's data", async () => {
    userRepositoryMocked.read.mockResolvedValue(user);
    userRepositoryMocked.update.mockResolvedValue(user);

    const response = await userServices.update('1', user);

    expect(response).toEqual({
      payload: {
        id: '1',
        name: 'Aline',
        email: 'aan4@cin.ufpe.br',
        password: 'senha123',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
      status: 200,
    });
  });

  it('should delete a user', async () => {
    userRepositoryMocked.read.mockResolvedValue(user);
    userRepositoryMocked.delete.mockResolvedValue(user);

    const response = await userServices.delete('1');

    expect(response).toEqual({
      payload: {
        id: '1',
        name: 'Aline',
        email: 'aan4@cin.ufpe.br',
        password: 'senha123',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
      status: 200,
    });
  });

  it('should return error when user not found', async () => {
    userRepositoryMocked.read.mockResolvedValue(null);

    const response = await userServices.read('1');

    expect(response).toEqual({
      payload: 'User not found',
      status: 404,
    });
  });

  it('should return error when user already exists', async () => {
    userRepositoryMocked.readByEmail.mockResolvedValue(user);

    const response = await userServices.create(user);

    expect(response).toEqual({
      payload: 'User already exists',
      status: 409,
    });
  });

  it('should return error when user not found to update', async () => {
    userRepositoryMocked.read.mockResolvedValue(null);

    const response = await userServices.update('1', user);

    expect(response).toEqual({
      payload: 'User not found',
      status: 404,
    });
  });

  it('should return error when user already exists to update', async () => {
    userRepositoryMocked.read.mockResolvedValue(user);
    userRepositoryMocked.readByEmail.mockResolvedValue(user);

    const response = await userServices.update('1', user);

    expect(response).toEqual({
      payload: 'User already exists',
      status: 409,
    });
  });

  it('should return error when user not found to delete', async () => {
    userRepositoryMocked.read.mockResolvedValue(null);

    const response = await userServices.delete('1');

    expect(response).toEqual({
      payload: 'User not found',
      status: 404,
    });
  });

  it('should return error if something goes wrong when creating a user', async () => {
    userRepositoryMocked.create.mockRejectedValue(
      new Error('Internal Server Error')
    );

    const response = await userServices.create(user);

    expect(response).toBeInstanceOf(Error);
  });

  it('should return error if something goes wrong when updating a user', async () => {
    userRepositoryMocked.read.mockResolvedValue(user);
    userRepositoryMocked.update.mockRejectedValue(
      new Error('Internal Server Error')
    );

    const response = await userServices.update('1', user);

    expect(response).toBeInstanceOf(Error);
  });

  it('should return error if something goes wrong when deleting a user', async () => {
    userRepositoryMocked.read.mockResolvedValue(user);
    userRepositoryMocked.delete.mockRejectedValue(
      new Error('Internal Server Error')
    );

    const response = await userServices.delete('1');

    expect(response).toBeInstanceOf(Error);
  });

  it('should return error if something goes wrong when reading all users', async () => {
    userRepositoryMocked.readAll.mockRejectedValue(
      new Error('Internal Server Error')
    );

    const response = await userServices.readAll();

    expect(response).toBeInstanceOf(Error);
  });

  it('should return error if something goes wrong when reading a user by id', async () => {
    userRepositoryMocked.read.mockRejectedValue(
      new Error('Internal Server Error')
    );

    const response = await userServices.read('1');

    expect(response).toBeInstanceOf(Error);
  });
});
