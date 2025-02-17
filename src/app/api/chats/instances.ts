import { ChatControllers } from './chat-controllers';
import { ChatServices } from './chat-service';
import { ChatRepository } from './chat-repository';

const chatRepository = new ChatRepository();
const chatServices = new ChatServices(chatRepository);
const chatController = new ChatControllers(chatServices);

export { chatController };
