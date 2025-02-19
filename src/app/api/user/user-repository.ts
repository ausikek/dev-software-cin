import { TUpdateUserDTO, TUserDTO } from './user-dto';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export interface IUserRepository {
  readAll(): Promise<User[]>;
  read(id: string): Promise<User | null>;
  readByEmail(email: string): Promise<User | null>;
  create(payload: TUserDTO): Promise<User>;
  update(payload: TUpdateUserDTO, id: string): Promise<User>;
  delete(id: string): Promise<User>;
}

export class UserRepository implements IUserRepository {
  private prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  >;

  constructor(
    prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  ) {
    this.prismaClient = prismaClient;
  }

  async readAll() {
    return await this.prismaClient.user.findMany();
  }

  async read(id: string) {
    return await this.prismaClient.user.findUnique({
      where: { id: id },
      include: { chatHistory: true },
    });
  }

  async readByEmail(email: string) {
    return await this.prismaClient.user.findUnique({
      where: { email: email },
    });
  }

  async create(payload: TUserDTO) {
    return await this.prismaClient.user.create({ data: payload });
  }

  async update(payload: TUpdateUserDTO, id: string) {
    return await this.prismaClient.user.update({
      data: payload,
      where: { id: id },
    });
  }

  async delete(id: string) {
    return await this.prismaClient.user.delete({ where: { id: id } });
  }
}
