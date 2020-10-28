import { transports } from 'winston';

export default {
    level: 'debug',
    handleExceptions: true,
    colorize: true,
    transports: new transports.Console()
};