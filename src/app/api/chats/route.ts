import { NextRequest } from 'next/server';
import { chatController } from './instances';

export async function POST(req: NextRequest) {
  return await chatController.create(req);
}
