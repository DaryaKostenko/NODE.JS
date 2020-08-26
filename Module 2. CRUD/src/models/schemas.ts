import * as Joi from '@hapi/joi';
import 'joi-extract-type';
import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';

export const userSchema = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
    login: Joi.string().min(3).regex(/^[a-zA-Z0-9_.-]+$/).required(),
    password: Joi.string().min(6).regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

export interface userRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        login: string;
        password: string;
        age: number;
        isDeleted: boolean;
    }
}

export const autoSuggestSchema = Joi.object({
    loginSubstring: Joi.string().optional(),
    limit: Joi.number().optional()
});

export interface autoSuggestRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        loginSubstring: string;
        limit: number;
    }
}
