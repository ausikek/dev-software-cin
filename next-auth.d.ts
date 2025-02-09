/* eslint-disable */
import NextAuth, { DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';
/* eslint-enable */

declare module 'next-auth' {
  interface Session {
    id: string;
    username: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    username: string;
  }
}
