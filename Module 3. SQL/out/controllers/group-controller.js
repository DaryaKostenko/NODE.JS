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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupController = void 0;
const inversify_1 = require("inversify");
const inversify_types_1 = require("../config/inversify.types");
let GroupController = class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
        this.getGroup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.groupService.getGroup(req.params.id)
                .then(group => res.json(group));
        });
        this.getGroups = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nameSubstring, limit } = req.query;
            yield this.groupService.getGroups({ nameSubstring, limit })
                .then(Group => res.json(Group));
        });
        this.createGroup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const group = req.body;
            yield this.groupService.createGroup(group)
                .then(group => res.json(group.id));
        });
        this.updateGroup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const group = req.body;
            yield this.groupService.updateGroup(req.params.id, group)
                .then(group => res.json(group.id));
        });
        this.deleteGroup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.groupService.deleteGroup(req.params.id)
                .then(() => res.sendStatus(200));
        });
        this.addUsersToGroup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const groupId = req.params.id;
            const userIds = req.body.userIds;
            yield this.groupService.addUsersToGroup(groupId, userIds)
                .then(() => res.sendStatus(200));
        });
    }
};
GroupController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(inversify_types_1.TYPES.GroupService)),
    __metadata("design:paramtypes", [Object])
], GroupController);
exports.GroupController = GroupController;
