import * as Joi from '@hapi/joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export const authSchema = Joi.object({
    login: Joi.string().min(3).regex(/^[a-zA-Z0-9_.-]+$/).required(),
    password: Joi.string().min(6).regex(/^(?=.*[a-zA-Z0-9])/).required()
});

export interface authRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        login: string;
        password: string;
    };
}

export const refreshSchema = Joi.object({
    token: Joi.string().min(3).required(),
});

export interface refreshRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        token: string;
    }
}