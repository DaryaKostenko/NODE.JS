"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoSuggestSchema = exports.userUpdateSchema = exports.userCreateSchema = void 0;
const Joi = __importStar(require("@hapi/joi"));
require("joi-extract-type");
const express_joi_validation_1 = require("express-joi-validation");
exports.userCreateSchema = Joi.object({
    login: Joi.string().min(3).regex(/^[a-zA-Z0-9_.-]+$/).required(),
    password: Joi.string().min(6).regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
    age: Joi.number().integer().min(4).max(130).required()
});
exports.userUpdateSchema = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
    login: Joi.string().min(3).regex(/^[a-zA-Z0-9_.-]+$/).required(),
    password: Joi.string().min(6).regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isdeleted: Joi.boolean().required()
});
exports.autoSuggestSchema = Joi.object({
    loginSubstring: Joi.string().optional(),
    limit: Joi.number().optional()
});
