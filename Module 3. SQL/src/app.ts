import express, { Application } from 'express';

import { InitDatabase } from './config/database';
import { container } from './config/inversify.config';
import { TYPES } from './config/inversify.types';
import { IRouterConfig } from './routers/router-config.interface';

const port = 3000;
const app: Application = express();
const routerConfig: IRouterConfig = container.get<IRouterConfig>(TYPES.RouterConfig);

    // app.use(express.urlencoded({ extended: false }));
    // app.use(express.json());

    // app.use((err: any, req: Request, res: Response) => {
    // if(err && err.error && err.error.isJoi) {
    //     res.status(400).json({
    //     type: err.type,
    //     message: err.error.toString()
    //     });
    // }
    // res.status(500).send(err);
    // });

InitDatabase();
routerConfig.initRoutes(app);

app.listen(port, function () {
    console.log(`App is listening on port ${port}!`);
});
