/* eslint-disable */
import NextAuth, { DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';
/* eslint-enable */

declare module 'next-auth' {
  interface Session {
    id: string;
    username: string;
    user: {
      id: string;
      name: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      name?: string | null | undefined;
    };
  }
}
