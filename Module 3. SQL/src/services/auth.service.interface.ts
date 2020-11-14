import { AuthInfo } from "../models/auth/auth-info";

export interface IAuthService {
    login(login:string, password:string): Promise<AuthInfo>;
    refresh(token:string):Promise<AuthInfo>;
    verify(token:string):Promise<boolean>;
}
export default IAuthService;