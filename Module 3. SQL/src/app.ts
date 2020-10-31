import { IErrorHandler } from './helpers/error-handler.interface';
import express, { Application } from 'express';

import { InitDatabase } from './config/database';
import { container } from './config/inversify.config';
import { TYPES } from './config/inversify.types';
import { IRouterConfig } from './routers/router-config.interface';

const port = 3000;
const app: Application = express();
const routerConfig: IRouterConfig = container.get<IRouterConfig>(TYPES.RouterConfig);
const errorHandler: IErrorHandler = container.get<IErrorHandler>(TYPES.ErrorHandler);

InitDatabase();
routerConfig.initRoutes(app);
errorHandler.initErrorHandlers(app);

app.listen(port, function () {
    console.log(`App is listening on port ${port}!`);
});
