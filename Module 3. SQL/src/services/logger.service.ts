import { injectable } from 'inversify';
import ILoggerService from "./logger-service.interface";
import { createLogger } from 'winston';
import loggerConfig from '../config/logger.config';
// import { IS_DEBUG_MODE } from '../config/config';


@injectable()
export class LoggerService implements ILoggerService {
    private logger = createLogger(loggerConfig);
    async debug(message: string, ...data: any): Promise<void> {
        // if(IS_DEBUG_MODE) {
        //     this.logger.debug(message, data);
        // }
    }
    async info(message: string, ...data: any): Promise<void> {
        this.logger.info(message, data);
    }
    async warning(message: string, ...data: any): Promise<void> {
        this.logger.warning(message, data);
    }
    async error(message: string, ...data: any): Promise<void> {
        this.logger.error(message, data);
    }

}
export default LoggerService;