// Complete code implementation here
// Do NOT use placeholders, TODOs, or "implementation here" comments
// Write the FULL working code
import { User as PrismaUser } from '@prisma/client';

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}