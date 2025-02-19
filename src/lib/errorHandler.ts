import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { logger } from './logger';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const errorHandler = (error: unknown) => {
  if (error instanceof ZodError) {
    console.log(error.issues);
    return NextResponse.json(
      { message: 'Erro de validação', errors: error.issues },
      { status: 400 }
    );
  } else if (error instanceof PrismaClientKnownRequestError) {
    return NextResponse.json(
      {
        message: 'Prisma Error',
        errors: {
          code: error.code,
          name: error.name,
          meta: error.meta,
          clientVersion: error.clientVersion,
        },
      },
      { status: 500 }
    );
  } else if (error instanceof SyntaxError) {
    console.log(error.message);
    return NextResponse.json(
      { message: 'Erro de sintaxe', error: error.message },
      { status: 400 }
    );
  } else {
    logger.error('Erro interno', error);

    return NextResponse.json(
      { message: (error as Error).message, name: (error as Error).name },
      { status: 500 }
    );
  }
};
