import 'reflect-metadata';

import { Container } from 'inversify';

import { UserController } from '../controllers/user-controller';
import IUserController from '../controllers/user-controller.interface';
import { GroupDal } from '../data-access/group-dal';
import { GroupDataMapper } from '../data-access/mappers/group-data-mapper';
import { UserDal } from '../data-access/user-dal';
import IUserDal from '../data-access/user-dal.interface';
import { UserDataMapper } from '../data-access/mappers/user-data-mapper';
import { IUserMapper } from '../data-access/mappers/user-data-mapper.interface';
import RouterConfig from '../routers/router-config';
import UserRouter from '../routers/user.router';
import IUserService from '../services/user-service.interface';
import { UserService } from '../services/users.service';
import { GroupController } from './../controllers/group-controller';
import { IGroupController } from '../controllers/group-controller.interface';
import { IGroupDal } from './../data-access/group-dal.interface';
import { IGroupMapper } from '../data-access/mappers/group-data-mapper.interface';
import { GroupRouter } from './../routers/group.router';
import { IRouterConfig } from './../routers/router-config.interface';
import { IRouter } from './../routers/router.interface';
import { IGroupService } from '../services/group-service.interface';
import { GroupService } from './../services/group.service';
import { TYPES } from './inversify.types';

const container = new Container();
container.bind<IGroupService>(TYPES.GroupService).to(GroupService);
container.bind<IUserService>(TYPES.UserService).to(UserService);

container.bind<IGroupController>(TYPES.GroupController).to(GroupController);
container.bind<IUserController>(TYPES.UserController).to(UserController);

container.bind<IGroupDal>(TYPES.GroupDal).to(GroupDal);
container.bind<IUserDal>(TYPES.UserDal).to(UserDal);

container.bind<IGroupMapper>(TYPES.GroupMapper).to(GroupDataMapper);
container.bind<IUserMapper>(TYPES.UserMapper).to(UserDataMapper);

container.bind<IRouter>(TYPES.UserRouter).to(UserRouter);
container.bind<IRouter>(TYPES.GroupRouter).to(GroupRouter);
container.bind<IRouterConfig>(TYPES.RouterConfig).to(RouterConfig);

export { container };