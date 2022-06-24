import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { LoggerService } from '../../logger/logger.service';
import { ReqHelper } from '../helpers/req.helper';


@Injectable()
export class LoggerMiddleware extends ReqHelper implements NestMiddleware {
    private readonly _settings = {
        level: 'debug',
        silence: ['healthz'],
    };

    constructor(private readonly logger: LoggerService) { super(); }

    public use(req: Request, res: Response, next: NextFunction) {
        const action = this.getUrl(req).split('/')[1];
        if (this._settings.silence.includes(action)) {
            return next();
        }

        req.on('error', (error: Error) => {
            this.logMethodByStatus(error.message, error.stack, req.statusCode);
        });

        res.on('error', (error: Error) => {
            this.logMethodByStatus(error.message, error.stack, res.statusCode);
        });

        res.on('finish', () => {
            const message = {
                path: `${req.method} ${this.getUrl(req)}`,
                referrer: this.getReferrer(req),
                userAgent: this.getUserAgent(req),
                remoteAddress: this.getIp(req),
                status: `${res.statusCode} ${res.statusMessage}`,
            };

            this.logMethodByStatus(message, '', res.statusCode);
        });

        return next();
    }

    private logMethodByStatus(
        message: any,
        stack: string,
        statusCode: number = 500,
    ) {
        const prefix = 'LoggerMiddleware';
        if (statusCode < 300) {
            return this.logger.info(message, prefix);
        } else if (statusCode < 400) {
            return this.logger.warn(message, prefix);
        } else {
            return this.logger.error(message, stack, prefix);
        }
    }
}
