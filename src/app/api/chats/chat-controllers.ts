import { NextRequest, NextResponse } from 'next/server';
import { IChatServices } from './chat-service';
import { errorHandler } from '@/lib/errorHandler';

export class ChatControllers {
  private chatService: IChatServices;

  constructor(chatService: IChatServices) {
    this.chatService = chatService;
  }

  async readAll() {
    try {
      const chats = await this.chatService.readAll();
      return NextResponse.json(chats, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  }

  async read(id: string) {
    try {
      const chat = await this.chatService.read(id);
      if (!chat)
        return NextResponse.json(
          { message: 'Chat not found' },
          { status: 404 }
        );
      return NextResponse.json(chat, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  }

  async readByUserId(userId: string) {
    try {
      const chat = await this.chatService.readByUserId(userId);
      if (!chat)
        return NextResponse.json(
          { message: 'Chat not found' },
          { status: 404 }
        );
      return NextResponse.json(chat, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  }

  async create(req: NextRequest) {
    try {
      const body = await req.json();
      const chat = await this.chatService.create(body);
      return NextResponse.json(chat, { status: 201 });
    } catch (error) {
      return errorHandler(error);
    }
  }

  async update(id: string, req: NextRequest) {
    try {
      const body = await req.json();
      const chat = await this.chatService.update(id, body);
      return NextResponse.json(chat, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  }

  async delete(id: string) {
    try {
      await this.chatService.delete(id);
      return NextResponse.json({ message: 'Chat deleted' }, { status: 200 });
    } catch (error) {
      return errorHandler(error);
    }
  }
}
