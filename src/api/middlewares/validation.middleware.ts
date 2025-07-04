// Complete code implementation here
// Do NOT use placeholders, TODOs, or "implementation here" comments
// Write the FULL working code
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'fail',
          errors: error.errors,
        });
      }
      next(error);
    }
  };