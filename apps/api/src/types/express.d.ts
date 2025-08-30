// types/express.d.ts
import { AuthUser } from '../auth/auth.types';

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthUser;
  }
}