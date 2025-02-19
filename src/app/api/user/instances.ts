import { UserControllers } from './user-controllers';
import { UserServices } from './user-services';
import { UserRepository } from './user-repository';
import prisma from '@/database/database';

const userRepository = new UserRepository(prisma);
const userServices = new UserServices(userRepository);
const userController = new UserControllers(userServices);

export { userController };
