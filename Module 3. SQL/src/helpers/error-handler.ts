import { Application, NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { map } from 'lodash';

import { TYPES } from '../config/inversify.types';
import ILoggerService from '../services/logger-service.interface';
import { IErrorHandler } from './error-handler.interface';

@injectable()
class ErrorHandler implements IErrorHandler {
    constructor(@inject(TYPES.LoggerService) private loggerService: ILoggerService) {}

    initErrorHandlers(app: Application):Application {
        // joi
        app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            if (err && err.error && err.error.isJoi) {
            // if it's a joi error, return a custom 400 json response
                res.status(400).json({
                    type: err.type,
                    message: err.error.toString()
                });
                return;
            }
            next(err)
        });
        
        //db error
        app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            if (err.name && err.name.indexOf('Sequelize') !== -1) {
                const errors = err.errors;
                if (errors) {
                    const combinedMessage = map(errors, e => e.message).join(' ;');
                    this.loggerService.error(combinedMessage);
                    res.status(500).send(combinedMessage);
                    return;
                }
            }
            next(err)
        });

        //common error
        app.use((err: any, req: Request, res: Response) => {
            this.loggerService.error(err);
            res.status(500).send(err?.message ?? err);
        });

        process.on('unhandledRejection', (reason, promise: Promise<any>):void => {
            this.loggerService.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
        });

        process.on('uncaughtException', (err: Error):void => {
            this.loggerService.error(`Caught exception: ${err}`);
        });

        return app;
    }
}

export default ErrorHandler;