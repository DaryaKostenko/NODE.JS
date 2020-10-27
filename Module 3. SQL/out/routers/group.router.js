"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupRouter = void 0;
require("joi-extract-type");
const express_1 = require("express");
const express_joi_validation_1 = require("express-joi-validation");
const inversify_1 = require("inversify");
const schemas_1 = require("../models/group/schemas");
const inversify_types_1 = require("./../config/inversify.types");
let GroupRouter = class GroupRouter {
    constructor(groupController) {
        this.groupController = groupController;
        this.validator = express_joi_validation_1.createValidator();
    }
    init() {
        return express_1.Router()
            .get('/', this.validator.query(schemas_1.groupsFilterRequestSchema), this.groupController.getGroups)
            .get('/:id', this.groupController.getGroup)
            .post('/', this.validator.body(schemas_1.groupSchema), this.groupController.createGroup)
            .put('/:id', this.validator.body(schemas_1.groupSchema), this.groupController.updateGroup)
            .delete('/:id', this.validator.params(schemas_1.groupSchema), this.groupController.deleteGroup)
            .post('/:id/users', this.validator.params(schemas_1.groupSchema), this.validator.body(schemas_1.addUsersRequestSchema), this.groupController.addUsersToGroup);
    }
};
GroupRouter = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(inversify_types_1.TYPES.GroupController)),
    __metadata("design:paramtypes", [Object])
], GroupRouter);
exports.GroupRouter = GroupRouter;
exports.default = GroupRouter;
