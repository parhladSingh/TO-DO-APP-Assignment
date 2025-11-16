import { Request, Response, NextFunction } from 'express';
import Log from '../models/Log';

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error to database
  try {
    await Log.create({
      level: 'error',
      message: message,
      stack: err.stack,
      endpoint: req.path,
      method: req.method,
      userId: (req as any).userId,
      statusCode: statusCode
    });
  } catch (logError) {
    console.error('Failed to log error to database:', logError);
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
