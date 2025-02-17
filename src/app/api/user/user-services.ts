import { User } from '@prisma/client';
import { IUserRepository } from './user-repository';
import { TUpdateUserDTO, TUserDTO, UpdateUserDTO, UserDTO } from './user-dto';
import { hash } from 'bcrypt';

export interface IUserServicesReturnPayload {
  payload: User | string;
  status: number;
}

export interface IUserServicesReturnPayloadArray {
  payload: User[] | string;
  status: number;
}

export interface IUserServices {
  readAll(): Promise<IUserServicesReturnPayloadArray | Error>;
  read(id: string): Promise<IUserServicesReturnPayload | Error>;
  create(payload: TUserDTO): Promise<IUserServicesReturnPayload | Error>;
  update(
    id: string,
    payload: TUpdateUserDTO
  ): Promise<IUserServicesReturnPayload | Error>;
  delete(id: string): Promise<IUserServicesReturnPayload | Error>;
}

export class UserServices implements IUserServices {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async readAll(): Promise<IUserServicesReturnPayloadArray | Error> {
    try {
      const users = await this.userRepository.readAll();

      return { payload: users, status: 200 };
    } catch (error) {
      return error as Error;
    }
  }

  async read(id: string): Promise<IUserServicesReturnPayload | Error> {
    try {
      const user = await this.userRepository.read(id);

      if (!user) {
        return { payload: 'User not found', status: 404 };
      }

      return { payload: user, status: 200 };
    } catch (error) {
      return error as Error;
    }
  }

  async create(payload: TUserDTO): Promise<IUserServicesReturnPayload | Error> {
    try {
      const parsedPayload = UserDTO.parse(payload);

      const userExists = await this.userRepository.readByEmail(
        parsedPayload.email
      );

      if (userExists) {
        return { payload: 'User already exists', status: 409 };
      }

      const hashedPassword = await hash(parsedPayload.password, 8);

      const userPayload = {
        ...parsedPayload,
        password: hashedPassword,
      };

      const user = await this.userRepository.create(userPayload);

      return { payload: user, status: 201 };
    } catch (error) {
      return error as Error;
    }
  }

  async update(
    id: string,
    payload: TUpdateUserDTO
  ): Promise<IUserServicesReturnPayload | Error> {
    try {
      const parsedPayload = UpdateUserDTO.parse(payload);

      const userExists = await this.userRepository.read(id);

      if (!userExists) {
        return { payload: 'User not found', status: 404 };
      }

      if (parsedPayload.email) {
        const user = await this.userRepository.readByEmail(parsedPayload.email);

        if (user) {
          return { payload: 'User already exists', status: 409 };
        }
      }

      if (parsedPayload.password) {
        parsedPayload.password = await hash(parsedPayload.password, 8);
      }

      const user = await this.userRepository.update(parsedPayload, id);

      return { payload: user, status: 200 };
    } catch (error) {
      return error as Error;
    }
  }

  async delete(id: string): Promise<IUserServicesReturnPayload | Error> {
    try {
      const user = await this.userRepository.delete(id);

      if (!user) {
        return { payload: 'User not found', status: 404 };
      }

      return { payload: user, status: 200 };
    } catch (error) {
      return error as Error;
    }
  }
}
