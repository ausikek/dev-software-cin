import prisma from '@/database/database';
import { TUpdateUserDTO, TUserDTO } from './user-dto';
import { User } from '@prisma/client';

export interface IUserRepository {
  readAll(): Promise<User[]>;
  read(id: string): Promise<User | null>;
  readByEmail(email: string): Promise<User | null>;
  create(payload: TUserDTO): Promise<User>;
  update(payload: TUpdateUserDTO, id: string): Promise<User>;
  delete(id: string): Promise<User>;
}

export class UserRepository implements IUserRepository {
  constructor() {}

  async readAll() {
    return await prisma.user.findMany();
  }

  async read(id: string) {
    return await prisma.user.findUnique({
      where: { id: id },
      include: { chatHistory: true },
    });
  }

  async readByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email: email },
    });
  }

  async create(payload: TUserDTO) {
    return await prisma.user.create({ data: payload });
  }

  async update(payload: TUpdateUserDTO, id: string) {
    return await prisma.user.update({ data: payload, where: { id: id } });
  }

  async delete(id: string) {
    return await prisma.user.delete({ where: { id: id } });
  }
}
