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
exports.GroupDal = void 0;
const group_data_mapper_1 = require("./group-data-mapper");
const sequelize_1 = require("sequelize");
const group_model_1 = require("../models/group/group.model");
const database_1 = require("../config/database");
const userGroup_model_1 = require("../models/userGroup/userGroup.model");
const inversify_1 = require("inversify");
const inversify_types_1 = require("../config/inversify.types");
let GroupDal = class GroupDal {
    constructor(dataMapper) {
        this.dataMapper = dataMapper;
    }
    getGroup(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield group_model_1.GroupModel.findOne({ where: { id } });
            return group ? this.dataMapper.toDomain(group) : null;
        });
    }
    getGroups(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const groups = yield group_model_1.GroupModel.findAll({
                where: {
                    name: {
                        [sequelize_1.Op.iLike]: `%${options.nameSubstring || ''}%`
                    }
                },
                limit: options.limit || 10,
                order: [['name', 'ASC']]
            });
            return groups.map((group) => this.dataMapper.toDomain(group));
        });
    }
    createGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            const newGroup = group;
            const GroupDal = yield group_model_1.GroupModel.create(newGroup);
            return this.dataMapper.toDomain(GroupDal);
        });
    }
    updateGroup(id, group) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedGroup = Object.assign(Object.assign({}, group), { id });
            const [total, updatedGroups] = yield group_model_1.GroupModel.update(updatedGroup, { where: { id }, returning: true });
            if (total === 0)
                throw Error('group not found');
            return this.dataMapper.toDomain(updatedGroups[0]);
        });
    }
    deleteGroup(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield group_model_1.GroupModel.findOne({ where: { id } }).then((group) => {
                if (!group)
                    throw Error('group not found');
                group.destroy();
            });
        });
    }
    addUsersToGroup(groupId, userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.sequelize.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                yield userGroup_model_1.UserGroupModel.bulkCreate(userIds.map(userId => ({ groupId, userId }), { transaction }));
            }));
        });
    }
};
GroupDal = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(inversify_types_1.TYPES.GroupMapper)),
    __metadata("design:paramtypes", [group_data_mapper_1.GroupDataMapper])
], GroupDal);
exports.GroupDal = GroupDal;
