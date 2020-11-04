import express, { Application } from 'express';

import { PORT } from './config/config';
import { InitDatabase } from './config/database';
import { container } from './config/inversify.config';
import { TYPES } from './config/inversify.types';
import { IErrorHandler } from './helpers/error-handler.interface';
import { AuthMiddleware } from './middlewares/auth-middleware';
import { IRouterConfig } from './routers/router-config.interface';

const app: Application = express();
const routerConfig: IRouterConfig = container.get<IRouterConfig>(TYPES.RouterConfig);
const errorHandler: IErrorHandler = container.get<IErrorHandler>(TYPES.ErrorHandler);

InitDatabase();

app.use(express.urlencoded({ extended: false }))
    .use(express.json());

AuthMiddleware(app);
routerConfig.initRoutes(app);
errorHandler.initErrorHandlers(app);

const server = app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT}!`);
});


export { app, server };
