import { Application } from "express";

export interface IErrorHandler {
    initErrorHandlers(app: Application): Application;
}
