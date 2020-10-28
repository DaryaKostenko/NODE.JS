import { Application } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from './../config/inversify.types';
import { IRouterConfig } from './router-config.interface';
import { IRouter } from './router.interface';

@injectable()
export class RouterConfig implements IRouterConfig {
    constructor(
        @inject(TYPES.UserRouter) private userRouter: IRouter,
        @inject(TYPES.GroupRouter) private groupRouter: IRouter
    ){}

    initRoutes(application: Application):void {
        application.use('/api/users', this.userRouter.init());
        application.use('/api/groups', this.groupRouter.init());
    }
}

export default RouterConfig; 
