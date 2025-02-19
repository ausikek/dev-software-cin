import { ChatHistory, Prisma, PrismaClient } from '@prisma/client';
import { TChatDTO, TUpdateChatDTO } from './chat-dto';
import { DefaultArgs } from '@prisma/client/runtime/library';

export interface IChatRepository {
  readAll(): Promise<ChatHistory[]>;
  read(id: string): Promise<ChatHistory | null>;
  readByUserId(userId: string): Promise<ChatHistory[]>;
  create(payload: TChatDTO): Promise<ChatHistory>;
  update(id: string, payload: TUpdateChatDTO): Promise<ChatHistory>;
  delete(id: string): Promise<ChatHistory>;
}

export class ChatRepository implements IChatRepository {
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
    return await this.prismaClient.chatHistory.findMany();
  }

  async read(id: string) {
    return await this.prismaClient.chatHistory.findUnique({ where: { id } });
  }

  async readByUserId(userId: string) {
    return await this.prismaClient.chatHistory.findMany({ where: { userId } });
  }

  async create(payload: TChatDTO) {
    return await this.prismaClient.chatHistory.create({ data: payload });
  }

  async update(id: string, payload: TUpdateChatDTO) {
    return await this.prismaClient.chatHistory.update({
      where: { id },
      data: payload,
    });
  }

  async delete(id: string) {
    return await this.prismaClient.chatHistory.delete({ where: { id } });
  }
}
