import { GET, POST } from '@/app/api/user/route';
import { GET as idGET, PATCH, DELETE } from '@/app/api/user/[id]/route';
import { NextRequestMock } from '../helper/nextRequestMocker';

describe('user routes test suite', () => {
  const user = {
    name: 'Aline',
    email: 'aan4@cin.ufpe.br',
    password: 'senha123',
  };

  const request = new NextRequestMock();

  it('should get all users', async () => {
    const response = await GET();

    expect(await response.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          password: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ])
    );
  });

  it('should create an user', async () => {
    const response = await request.post(POST, { payload: user });

    const body = await response.json();

    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        password: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
    expect(response.status).toEqual(201);
  });

  it('should update an user', async () => {
    const responseGetAll = await GET();
    const users = await responseGetAll.json();
    const userToUpdate = users[0];

    const updatedUser = {
      name: 'Updated Name',
      email: 'updatedemail@example.com',
      password: 'newpassword',
    };

    const responseUpdate = await request.patch(PATCH, {
      slug: userToUpdate.id,
      payload: updatedUser,
    });
    const body = await responseUpdate.json();

    expect(body).toEqual(
      expect.objectContaining({
        id: userToUpdate.id,
        name: 'Updated Name',
        password: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
    expect(responseUpdate.status).toEqual(200);
  });

  it('should get a user by ID', async () => {
    const responseGetAll = await GET();
    const users = await responseGetAll.json();
    const userToGet = users[0];

    const responseGetById = await request.getWithParams(idGET, {
      slug: userToGet.id,
    });
    const body = await responseGetById.json();

    expect(body).toEqual(
      expect.objectContaining({
        id: userToGet.id,
        name: expect.any(String),
        password: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
    expect(responseGetById.status).toEqual(200);
  });

  it('should delete an user', async () => {
    const responseGetAll = await GET();
    const users = await responseGetAll.json();
    const userToDelete = users[0];

    const responseDelete = await request.delete(DELETE, {
      slug: userToDelete.id,
    });

    const body = await responseDelete.json();

    expect(body).toEqual(
      expect.objectContaining({
        id: userToDelete.id,
        name: expect.any(String),
        password: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
    expect(responseDelete.status).toEqual(200);
  });
});
