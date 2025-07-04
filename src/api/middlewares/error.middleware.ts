// Complete code implementation here
// Do NOT use placeholders, TODOs, or "implementation here" comments
// Write the FULL working code
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

interface AppError extends Error {
  statusCode: number;
  isOperational?: boolean;
}

export class ApiError extends Error implements AppError {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const handleZodError = (err: ZodError): AppError => {
  const errors = err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
  const message = `Invalid input data. ${errors}`;
  return new ApiError(400, message);
};

const handlePrismaClientKnownRequestError = (err: Prisma.PrismaClientKnownRequestError): AppError => {
  let message = 'An unexpected database error occurred.';
  let statusCode = 500;

  switch (err.code) {
    case 'P2002': // Unique constraint failed
      message = `Duplicate field value: ${err.meta?.target}`;
      statusCode = 409; // Conflict
      break;
    case 'P2025': // Record to update or delete does not exist
      message = 'Record not found.';
      statusCode = 404;
      break;
    default:
      message = 'Database request error.';
      statusCode = 500;
  }
  return new ApiError(statusCode, message);
};

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let error: AppError = err as AppError;

  if (!(error instanceof ApiError)) {
    if (err instanceof ZodError) {
      error = handleZodError(err);
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
      error = handlePrismaClientKnownRequestError(err);
    } else {
      console.error('UNHANDLED ERROR 💥', err);
      error = new ApiError(500, 'Something went very wrong!', false);
    }
  }
  
  res.status(error.statusCode || 500).json({
    status: 'error',
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};