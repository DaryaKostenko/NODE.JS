import { Application } from 'express';

export interface IRouterConfig {
    initRoutes(application: Application): void;
} 
