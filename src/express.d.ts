import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: any; // Adjust the type as needed, e.g., `user?: YourUserType`
  }
}