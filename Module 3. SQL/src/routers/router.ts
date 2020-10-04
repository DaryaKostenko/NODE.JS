import express, { Application, Request, Response } from 'express';
import userRouter from './user.router';
import groupRouter from './group.router';

export function InitRouters(app: Application): void {
    app.use('/api/users', userRouter);
    app.use('/api/groups', groupRouter);

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use((err: any, req: Request, res: Response) => {
    if(err && err.error && err.error.isJoi) {
        res.status(400).json({
        type: err.type,
        message: err.error.toString()
        });
    }
    res.status(500).send(err);
    });
}
