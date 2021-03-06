export const TYPES = {
    GroupService: Symbol.for('GroupService'),
    GroupController: Symbol.for('GroupController'),
    GroupRouter: Symbol.for('GroupRouter'),
    RouterConfig: Symbol.for('RouterConfig'),
    GroupDal: Symbol.for('GroupDal'),
    GroupMapper:Symbol.for('GroupMapper'),

    UserMapper:Symbol.for('UserMapper'),
    UserDal:Symbol.for('UserDal'),
    UserService:Symbol.for('UserService'),    
    UserController: Symbol.for('UserController'),
    UserRouter: Symbol.for('UserRouter'),

    LoggerService: Symbol.for('LoggerService'),
    ErrorHandler: Symbol.for('ErrorHandler'),

    AuthController: Symbol.for('AuthController'),
    AuthService: Symbol.for('AuthService'),
    AuthRouter: Symbol.for('AuthRouter')
}