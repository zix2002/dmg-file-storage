"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../src/index"));
index_1.default.file('users.json').setItem({ a: 1 });
var users = index_1.default.file('users.json').getItem();
console.log(users);
