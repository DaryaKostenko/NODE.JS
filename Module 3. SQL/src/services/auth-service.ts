import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';

import { AUTH_REFRESH_EXPIRATION, AUTH_REFRESH_ID, AUTH_TOKEN_EXPIRATION, AUTH_TOKEN_ID, SECRET } from '../config/config';
import { TYPES } from '../config/inversify.types';
import UserDal from '../data-access/user-dal';
import { LogClass } from '../helpers/logger.decorator';
import { AuthInfo } from '../models/auth/auth-info';
import IAuthService from './auth.service.interface';

@LogClass
@injectable()
export class AuthService implements IAuthService {
    constructor(@inject(TYPES.UserDal) private userDal: UserDal) { }

    async login(login: string, password: string): Promise<AuthInfo> {
        const userId = await this.userDal.getUserId(login, password);
        if (!userId) throw Error("Bad login/password combination");
        return this.generateTokens(userId);
    }

    async refresh(token:string):Promise<AuthInfo>{
        return new Promise<AuthInfo>((resolve, reject) => {
            jwt.verify(token, SECRET, { jwtid: AUTH_REFRESH_ID }, (err, payload) => {
                if(err) {
                    reject(err.message);
                }
                else if(!payload) {
                    reject('token is incorrect');
                }
                else resolve(this.generateTokens(payload.toString()));
            });
        });
    }

    async verify(token:string):Promise<boolean> {
        return new Promise<true>((resolve, reject) => {
            jwt.verify(token, SECRET, { jwtid: AUTH_TOKEN_ID }, (err, payload) => {
                if(err) {
                    reject(err.message);
                }
                else if(!payload) {
                    reject('token is incorrect');
                }
                else resolve(true);
            });
        });
    }

    private generateTokens(payload: string): AuthInfo {
        return {
            accessToken: jwt.sign({ payload }, SECRET, { jwtid: AUTH_TOKEN_ID,  expiresIn: AUTH_TOKEN_EXPIRATION }),
            refreshToken: jwt.sign({ payload }, SECRET, { jwtid: AUTH_REFRESH_ID, expiresIn: AUTH_REFRESH_EXPIRATION })
        };
    }
}
