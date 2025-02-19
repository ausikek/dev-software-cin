import { UserControllers } from '@/app/api/user/user-controllers';
import { IUserServices } from '@/app/api/user/user-services';
import { NextRequest } from 'next/server';
import mock, { mockReset } from 'jest-mock-extended/lib/Mock';

export const mockUserServices = (): jest.Mocked<IUserServices> => ({
  readAll: jest.fn(),
  read: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('user controllers tests suite', () => {
  let userServicesMocked: jest.Mocked<IUserServices>;
  let userControllers: UserControllers;
  const nextRequestMock: NextRequest = mock<NextRequest>();

  beforeEach(() => {
    userServicesMocked = mockUserServices();
    userControllers = new UserControllers(userServicesMocked);
    mockReset(nextRequestMock);
  });

  const user = {
    id: '1',
    name: 'Aline',
    email: 'aan4@cin.ufpe.br',
    password: 'senha123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

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

    userServicesMocked.readAll.mockResolvedValue({
      payload: users,
      status: 200,
    });

    const response = await userControllers.readAll();

    expect(userServicesMocked.readAll).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual([
      {
        id: '1',
        name: 'Aline',
        email: 'aan4@cin.ufpe.br',
        password: 'senha123',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      {
        id: '2',
        name: 'Breno',
        email: 'bonof@cin.ufpe.br',
        password: 'senha123',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
    expect(response.status).toEqual(200);
  });

  it('should return users by id', async () => {
    userServicesMocked.read.mockResolvedValue({
      payload: user,
      status: 200,
    });

    const response = await userControllers.read('1');

    expect(userServicesMocked.read).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual({
      id: '1',
      name: 'Aline',
      email: 'aan4@cin.ufpe.br',
      password: 'senha123',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(response.status).toEqual(200);
  });

  it('should create an user', async () => {
    userServicesMocked.create.mockResolvedValue({
      payload: user,
      status: 201,
    });
    const response = await userControllers.create(nextRequestMock);

    expect(userServicesMocked.create).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual({
      id: '1',
      name: 'Aline',
      email: 'aan4@cin.ufpe.br',
      password: 'senha123',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(response.status).toEqual(201);
  });

  it('should update an user', async () => {
    userServicesMocked.update.mockResolvedValue({
      payload: user,
      status: 200,
    });
    const response = await userControllers.update('1', nextRequestMock);

    expect(userServicesMocked.update).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual({
      id: '1',
      name: 'Aline',
      email: 'aan4@cin.ufpe.br',
      password: 'senha123',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(response.status).toEqual(200);
  });

  it('should delete an user', async () => {
    userServicesMocked.delete.mockResolvedValue({
      payload: user,
      status: 200,
    });

    const response = await userControllers.delete('1');

    expect(userServicesMocked.delete).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual({
      id: '1',
      name: 'Aline',
      email: 'aan4@cin.ufpe.br',
      password: 'senha123',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(response.status).toEqual(200);
  });

  it('should go into catch block when userService returns instanceof Error in readAll', async () => {
    userServicesMocked.readAll.mockRejectedValue(new Error('Error!!!'));

    const response = await userControllers.readAll();

    expect(userServicesMocked.readAll).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual({
      message: 'Error!!!',
      name: 'Error',
    });
    expect(response.status).toEqual(500);
  });

  it('should go into catch block when userService returns instanceof Error in read', async () => {
    userServicesMocked.read.mockRejectedValue(new Error('Error!!!'));

    const response = await userControllers.read('1');

    expect(userServicesMocked.read).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual({
      message: 'Error!!!',
      name: 'Error',
    });
    expect(response.status).toEqual(500);
  });

  it('should go into catch block when userService returns instanceof Error in create', async () => {
    userServicesMocked.create.mockRejectedValue(new Error('Error!!!'));

    const response = await userControllers.create(nextRequestMock);

    expect(userServicesMocked.create).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual({
      message: 'Error!!!',
      name: 'Error',
    });
    expect(response.status).toEqual(500);
  });

  it('should go into catch block when userService returns instanceof Error in update', async () => {
    userServicesMocked.update.mockRejectedValue(new Error('Error!!!'));

    const response = await userControllers.update('1', nextRequestMock);

    expect(userServicesMocked.update).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual({
      message: 'Error!!!',
      name: 'Error',
    });
    expect(response.status).toEqual(500);
  });

  it('should go into catch block when userService returns instanceof Error in update', async () => {
    userServicesMocked.delete.mockRejectedValue(new Error('Error!!!'));

    const response = await userControllers.delete('1');

    expect(userServicesMocked.delete).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual({
      message: 'Error!!!',
      name: 'Error',
    });
    expect(response.status).toEqual(500);
  });

  it('should go into the if statement if userService is instanceof error in readAll', async () => {
    userServicesMocked.readAll.mockResolvedValue(
      new Error('Errored but inside services')
    );

    const response = await userControllers.readAll();

    expect(userServicesMocked.readAll).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual({
      message: 'Errored but inside services',
      name: 'Error',
    });
    expect(response.status).toEqual(500);
  });

  it('should go into the if statement if userService is instanceof error in read', async () => {
    userServicesMocked.read.mockResolvedValue(
      new Error('Errored but inside services')
    );

    const response = await userControllers.read('1');

    expect(userServicesMocked.read).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual({
      message: 'Errored but inside services',
      name: 'Error',
    });
    expect(response.status).toEqual(500);
  });

  it('should go into the if statement if userService is instanceof error in create', async () => {
    userServicesMocked.create.mockResolvedValue(
      new Error('Errored but inside services')
    );

    const response = await userControllers.create(nextRequestMock);

    expect(userServicesMocked.create).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual({
      message: 'Errored but inside services',
      name: 'Error',
    });
    expect(response.status).toEqual(500);
  });

  it('should go into the if statement if userService is instanceof error in update', async () => {
    userServicesMocked.update.mockResolvedValue(
      new Error('Errored but inside services')
    );

    const response = await userControllers.update('1', nextRequestMock);

    expect(userServicesMocked.update).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual({
      message: 'Errored but inside services',
      name: 'Error',
    });
    expect(response.status).toEqual(500);
  });
  it('should go into the if statement if userService is instanceof error in delete', async () => {
    userServicesMocked.delete.mockResolvedValue(
      new Error('Errored but inside services')
    );

    const response = await userControllers.delete('1');

    expect(userServicesMocked.delete).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual({
      message: 'Errored but inside services',
      name: 'Error',
    });
    expect(response.status).toEqual(500);
  });
});
