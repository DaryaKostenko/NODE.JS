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
exports.addUsersRequestSchema = exports.groupsFilterRequestSchema = exports.groupSchema = void 0;
const Joi = __importStar(require("@hapi/joi"));
require("joi-extract-type");
const express_joi_validation_1 = require("express-joi-validation");
exports.groupSchema = Joi.object({
    id: Joi.string().guid({ version: "uuidv4" }).optional(),
    name: Joi.string()
        .min(3)
        .regex(/^[a-zA-Z0-9_.-]+$/)
        .required(),
    permissions: Joi.array()
        .items(Joi.string().valid("READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"))
        .required(),
});
exports.groupsFilterRequestSchema = Joi.object({
    nameSubstring: Joi.string().optional(),
    limit: Joi.number().min(1).max(100).optional(),
});
exports.addUsersRequestSchema = Joi.object({
    userIds: Joi.array()
        .items(Joi.string().guid({ version: "uuidv4" }))
        .required(),
});
