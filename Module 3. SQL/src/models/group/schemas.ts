import * as Joi from "@hapi/joi";
import "joi-extract-type";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

import { Permissions } from "./permissions";

export const groupSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).optional(),
  name: Joi.string()
    .min(3)
    .regex(/^[a-zA-Z0-9_.-]+$/)
    .required(),
  permissions: Joi.array()
    .items(
      Joi.string().valid("READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES")
    )
    .required(),
});

export interface GroupRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    id: string;
    name: string;
    permissions: Array<Permissions>;
  };
}

export const groupsFilterRequestSchema = Joi.object({
  nameSubstring: Joi.string().optional(),
  limit: Joi.number().min(1).max(100).optional(),
});

export interface autoSuggestedGroupsRequestSchema
  extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    loginSubstring: string;
    limit: number;
  };
}

export const addUsersRequestSchema = Joi.object({
  userIds: Joi.array()
    .items(Joi.string().guid({ version: "uuidv4" }))
    .required(),
});
