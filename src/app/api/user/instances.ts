import { UserControllers } from './user-controllers';
import { UserServices } from './user-services';
import { UserRepository } from './user-repository';

const userRepository = new UserRepository();
const userServices = new UserServices(userRepository);
const userController = new UserControllers(userServices);

export { userController };
