import { IRouterConfig } from './router-config.interface';
import { TYPES } from './../config/inversify.types';
import { inject, injectable } from "inversify";
import { IRouter } from './router.interface';
import { Application } from 'express';

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
