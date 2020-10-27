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
exports.UserDal = void 0;
const inversify_1 = require("inversify");
const sequelize_1 = require("sequelize");
const inversify_types_1 = require("../config/inversify.types");
const user_model_1 = require("../models/user/user.model");
let UserDal = class UserDal {
    constructor(dataMapper) {
        this.dataMapper = dataMapper;
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ where: { id } });
            return user ? this.dataMapper.toDomain(user) : null;
        });
    }
    getUsers(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.UserModel.findAll({
                where: {
                    login: {
                        [sequelize_1.Op.like]: `%${options.loginSubstring || ""}%`,
                    },
                },
                limit: options.limit || 10,
                order: [["login", "ASC"]],
            });
            return users.map((user) => this.dataMapper.toDomain(user));
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDal = yield user_model_1.UserModel.create(user);
            return this.dataMapper.toDomain(userDal);
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = user.id;
            yield user_model_1.UserModel.update(user, { where: { id } });
            return user;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDal = yield user_model_1.UserModel.update({ isdeleted: true }, { where: { id } });
            return this.dataMapper.toDomain(userDal[1][0]);
        });
    }
};
UserDal = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(inversify_types_1.TYPES.UserMapper)),
    __metadata("design:paramtypes", [Object])
], UserDal);
exports.UserDal = UserDal;
