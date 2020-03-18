"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
// export const FileStorage = (filename: string) => {
//   const fullPath = `${process.cwd()}/cache/${filename}`;
//   const setItem = (value: Store | Store[]) => {
//     return fs.writeFileSync(fullPath, JSON.stringify(value));
//   };
//   const getItem = () => {
//     if (fs.existsSync(fullPath)) {
//       const result = fs.readFileSync(fullPath, 'utf8');
//       return JSON.parse(result);
//     }
//     return null;
//   };
//
//   // @ts-ignore
//   return this;
// };
// fileStorage.file('users.json').setItem();
var FileStorage = {
    fullPath: '',
    file: function (filename) {
        this.fullPath = process.cwd() + "/cache/" + filename;
        return this;
    },
    setItem: function (data) {
        fs_1.default.writeFileSync(this.fullPath, JSON.stringify(data));
        return this;
    },
    getItem: function () {
        if (fs_1.default.existsSync(this.fullPath)) {
            var fileContent = fs_1.default.readFileSync(this.fullPath, 'utf8');
            return JSON.parse(fileContent);
        }
        return null;
    },
};
exports.default = FileStorage;
