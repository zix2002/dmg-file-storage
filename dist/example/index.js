"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../src/index"));
// fileStorage.file('users.json').setItem({ a: 1 });
var users = index_1.default.file('users.json').paginate(3, 1);
// const users = fileStorage.file('users.json').search();
console.log(users);
