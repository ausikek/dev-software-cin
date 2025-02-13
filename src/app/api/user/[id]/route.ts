import { NextRequest } from 'next/server';
import { userController } from '../instances';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = (await params).id;

  return await userController.read(userId);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = (await params).id;

  return await userController.update(userId, req);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = (await params).id;

  return await userController.delete(userId);
}
