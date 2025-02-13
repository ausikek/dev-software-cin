import { NextRequest, NextResponse } from 'next/server';
import { IUserServices } from './user-services';
import { errorHandler } from '@/lib/errorHandler';

export interface IUserControllers {
  readAll(): Promise<unknown>;
  read(id: string): Promise<unknown>;
  create(req: NextRequest): Promise<unknown>;
  update(id: string, req: NextRequest): Promise<unknown>;
  delete(id: string): Promise<unknown>;
}

class UserControllers implements IUserControllers {
  private userServices: IUserServices;

  constructor(userServices: IUserServices) {
    this.userServices = userServices;
  }

  async readAll() {
    try {
      const serviceResponse = await this.userServices.readAll();

      if (serviceResponse instanceof Error) {
        return errorHandler(serviceResponse);
      }

      return NextResponse.json(serviceResponse.payload, {
        status: serviceResponse.status,
      });
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 500 }
      );
    }
  }

  async read(id: string) {
    try {
      const serviceResponse = await this.userServices.read(id);

      if (serviceResponse instanceof Error) {
        return errorHandler(serviceResponse);
      }

      return NextResponse.json(serviceResponse.payload, {
        status: serviceResponse.status,
      });
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 500 }
      );
    }
  }

  async create(req: NextRequest) {
    try {
      const body = await req.json();

      const serviceResponse = await this.userServices.create(body);

      if (serviceResponse instanceof Error) {
        return errorHandler(serviceResponse);
      }

      return NextResponse.json(serviceResponse.payload, {
        status: serviceResponse.status,
      });
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 500 }
      );
    }
  }

  async update(id: string, req: NextRequest) {
    try {
      const body = await req.json();

      const serviceResponse = await this.userServices.update(id, body);

      if (serviceResponse instanceof Error) {
        return errorHandler(serviceResponse);
      }

      return NextResponse.json(serviceResponse.payload, {
        status: serviceResponse.status,
      });
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 500 }
      );
    }
  }

  async delete(id: string) {
    try {
      const serviceResponse = await this.userServices.delete(id);

      if (serviceResponse instanceof Error) {
        return errorHandler(serviceResponse);
      }

      return NextResponse.json(serviceResponse.payload, {
        status: serviceResponse.status,
      });
    } catch (error) {
      if (error instanceof Error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export { UserControllers };
