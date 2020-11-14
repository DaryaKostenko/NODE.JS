import 'reflect-metadata';

import { Container } from 'inversify';

import AuthController from '../controllers/auth-controller';
import IAuthController from '../controllers/auth-controller.interface';
import { IGroupController } from '../controllers/group-controller.interface';
import { UserController } from '../controllers/user-controller';
import IUserController from '../controllers/user-controller.interface';
import { GroupDal } from '../data-access/group-dal';
import { GroupDataMapper } from '../data-access/mappers/group-data-mapper';
import { IGroupMapper } from '../data-access/mappers/group-data-mapper.interface';
import { UserDataMapper } from '../data-access/mappers/user-data-mapper';
import { IUserMapper } from '../data-access/mappers/user-data-mapper.interface';
import { UserDal } from '../data-access/user-dal';
import IUserDal from '../data-access/user-dal.interface';
import ErrorHandler from '../helpers/error-handler';
import { AuthRouter } from '../routers/auth-router';
import RouterConfig from '../routers/router-config';
import UserRouter from '../routers/user.router';
import { AuthService } from '../services/auth-service';
import IAuthService from '../services/auth.service.interface';
import { IGroupService } from '../services/group-service.interface';
import IUserService from '../services/user-service.interface';
import { UserService } from '../services/users.service';
import { GroupController } from './../controllers/group-controller';
import { IGroupDal } from './../data-access/group-dal.interface';
import { IErrorHandler } from './../helpers/error-handler.interface';
import { GroupRouter } from './../routers/group.router';
import { IRouterConfig } from './../routers/router-config.interface';
import { IRouter } from './../routers/router.interface';
import { GroupService } from './../services/group.service';
import { ILoggerService } from './../services/logger-service.interface';
import { LoggerService } from './../services/logger.service';
import { TYPES } from './inversify.types';

const container = new Container();
container.bind<IGroupService>(TYPES.GroupService).to(GroupService);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);

container.bind<IGroupController>(TYPES.GroupController).to(GroupController);
container.bind<IUserController>(TYPES.UserController).to(UserController);
container.bind<IAuthController>(TYPES.AuthController).to(AuthController);

container.bind<IGroupDal>(TYPES.GroupDal).to(GroupDal);
container.bind<IUserDal>(TYPES.UserDal).to(UserDal);

container.bind<IGroupMapper>(TYPES.GroupMapper).to(GroupDataMapper);
container.bind<IUserMapper>(TYPES.UserMapper).to(UserDataMapper);

container.bind<IRouter>(TYPES.UserRouter).to(UserRouter);
container.bind<IRouter>(TYPES.GroupRouter).to(GroupRouter);
container.bind<IRouter>(TYPES.AuthRouter).to(AuthRouter);
container.bind<IRouterConfig>(TYPES.RouterConfig).to(RouterConfig);

container.bind<ILoggerService>(TYPES.LoggerService).to(LoggerService);
container.bind<IErrorHandler>(TYPES.ErrorHandler).to(ErrorHandler);

export { container };
