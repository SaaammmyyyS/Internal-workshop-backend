import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const status = res.statusCode;
      const success = status < 400 ? '✅ SUCCESS' : '❌ FAILED';
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${status} (${duration}ms) ${success}`,
      );
    });

    next();
  }
}
