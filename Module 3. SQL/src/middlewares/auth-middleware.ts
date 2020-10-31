import cors from 'cors';
import { Application, NextFunction, Request, Response } from 'express';
import bearerToken from 'express-bearer-token';

import { container } from '../config/inversify.config';
import { TYPES } from '../config/inversify.types';
import IAuthService from '../services/auth.service.interface';

export function AuthMiddleware(app: Application): Application {
    const authService = container.get<IAuthService>(TYPES.AuthService);
    app.use(cors())
        .use(bearerToken())
        .use(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            if (req.url.indexOf('/api/auth') >= 0) {
                next();
            }
            else if (req.token) {
                authService.verify(req.token)
                    .then(success => {
                        if (!success) {
                            res.status(403).send('Failed to authenticated token.');
                        } else {
                            next();
                        }
                    })
                    .catch(err => next(err));
            } else {
                res.status(401).send('No token provided.');
            }
        });
    return app;
}