import { NextRequest } from 'next/server';
import { userController } from './instances';

export async function GET() {
  return await userController.readAll();
}

export async function POST(req: NextRequest) {
  return await userController.create(req);
}
