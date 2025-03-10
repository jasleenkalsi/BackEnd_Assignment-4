import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    role: string;
  };
}

// types/express.d.ts
import * as express from "express";

declare global {
    namespace Express {
        interface Request {
            user?: any; // You can replace `any` with a more specific type for `user`
        }
    }
}
