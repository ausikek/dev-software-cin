import { getTestUsers } from './helper/seedDatabase';

const globalSetup = async () => {
  await getTestUsers();
};

export default globalSetup;
