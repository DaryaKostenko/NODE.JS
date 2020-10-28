import ILoggerService from "../services/logger-service.interface";
import LoggerService from "../services/logger.service";

const logService: ILoggerService = new LoggerService();

export function LogClass(target: any): void {
    for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
        const descriptor = Object.getOwnPropertyDescriptor(
            target.prototype,
            propertyName
        );

        if (!descriptor) {
            continue;
        }

        LogMethod(target, propertyName, descriptor);

        Object.defineProperty(target.prototype, propertyName, descriptor);
    }
}

function LogMethod(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
): any {
    const originalMethod = descriptor.value;
    const className = target.name;
    const isMethod = originalMethod instanceof Function;
    const methodPath = `${className}.${propertyKey}`;

    if (!isMethod) {
        logService.debug(`${methodPath} ignored`);
        return;
    }

    descriptor.value = function (...args: any[]) {
        const params = args.map((arg) => JSON.stringify(arg)).join(", ");
        logService.info(`${methodPath}(${params}) starting`);

        const now = Date.now();
        const result = originalMethod.apply(this, args);

        const exitLog = (...args1: any[]) => {
            const results = args1.map((arg) => JSON.stringify(arg)).join(", ");
            logService.info(
                `${methodPath} took ${Date.now() - now}ms. Result: ${results}`
            );
        };

        if (typeof result === "object" && typeof result.then === "function") {
            const promise = result.then(exitLog);
            if (typeof promise.catch === "function") {
                promise.catch((e: any) =>
                    logService.error(`${methodPath} throws error: ${e}`)
                );
            }
        } else {
            exitLog(result);
        }

        return result;
    };
}
