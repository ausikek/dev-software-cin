import { IChatRepository } from './chat-repository';
import { TChatDTO, TUpdateChatDTO } from './chat-dto';
import { ChatHistory } from '@prisma/client';

export interface IChatServices {
  readAll(): Promise<ChatHistory[]>;
  read(id: string): Promise<ChatHistory | null>;
  readByUserId(userId: string): Promise<ChatHistory[]>;
  create(payload: TChatDTO): Promise<ChatHistory>;
  update(id: string, payload: TUpdateChatDTO): Promise<ChatHistory>;
  delete(id: string): Promise<ChatHistory>;
}

export class ChatServices implements IChatServices {
  private chatRepository: IChatRepository;

  constructor(chatRepository: IChatRepository) {
    this.chatRepository = chatRepository;
  }

  async readAll() {
    return await this.chatRepository.readAll();
  }

  async read(id: string) {
    return await this.chatRepository.read(id);
  }

  async readByUserId(userId: string) {
    return await this.chatRepository.readByUserId(userId);
  }

  async create(payload: TChatDTO) {
    return await this.chatRepository.create(payload);
  }

  async update(id: string, payload: TUpdateChatDTO) {
    return await this.chatRepository.update(id, payload);
  }

  async delete(id: string) {
    return await this.chatRepository.delete(id);
  }
}
