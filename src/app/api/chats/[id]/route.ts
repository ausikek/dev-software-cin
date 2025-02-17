import { NextRequest } from 'next/server';
import { chatController } from '../instances';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const chatId = (await params).id;

  return await chatController.read(chatId);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const chatId = (await params).id;

  return await chatController.update(chatId, req);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const chatId = (await params).id;

  return await chatController.delete(chatId);
}
