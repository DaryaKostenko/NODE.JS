export interface ILoggerService {
    info(message: string, data?: any): Promise<void>;
    warning(message: string, data?: any): Promise<void>;
    error(message: string, data?: any): Promise<void>;
}

export default ILoggerService;