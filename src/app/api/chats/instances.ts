import { ChatControllers } from './chat-controllers';
import { ChatServices } from './chat-service';
import { ChatRepository } from './chat-repository';
import prisma from '@/database/database';

const chatRepository = new ChatRepository(prisma);
const chatServices = new ChatServices(chatRepository);
const chatController = new ChatControllers(chatServices);

export { chatController };
