export interface ILoggerService {
    debug(message: string, data?: any): Promise<void>;
    info(message: string, data?: any): Promise<void>;
    warning(message: string, data?: any): Promise<void>;
    error(message: string, data?: any): Promise<void>;
}

export default ILoggerService;