import prisma from '@/database/database';
import { ChatHistory } from '@prisma/client';
import { TChatDTO, TUpdateChatDTO } from './chat-dto';

export interface IChatRepository {
  readAll(): Promise<ChatHistory[]>;
  read(id: string): Promise<ChatHistory | null>;
  readByUserId(userId: string): Promise<ChatHistory[]>;
  create(payload: TChatDTO): Promise<ChatHistory>;
  update(id: string, payload: TUpdateChatDTO): Promise<ChatHistory>;
  delete(id: string): Promise<ChatHistory>;
}

export class ChatRepository implements IChatRepository {
  async readAll() {
    return await prisma.chatHistory.findMany();
  }

  async read(id: string) {
    return await prisma.chatHistory.findUnique({ where: { id } });
  }

  async readByUserId(userId: string) {
    return await prisma.chatHistory.findMany({ where: { userId } });
  }

  async create(payload: TChatDTO) {
    return await prisma.chatHistory.create({ data: payload });
  }

  async update(id: string, payload: TUpdateChatDTO) {
    return await prisma.chatHistory.update({ where: { id }, data: payload });
  }

  async delete(id: string) {
    return await prisma.chatHistory.delete({ where: { id } });
  }
}
