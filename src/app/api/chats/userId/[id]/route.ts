import { NextRequest } from 'next/server';
import { chatController } from '../../instances';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const chatId = (await params).id;

  return await chatController.readByUserId(chatId);
}
