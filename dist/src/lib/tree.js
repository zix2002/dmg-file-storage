"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenToTree = function (flattenData) {
    var buildTree = function (parentId) {
        if (parentId === void 0) { parentId = null; }
        var currentLevelData = flattenData.filter(function (item) { return item.parentId === parentId; });
        if (currentLevelData.length > 0) {
            return currentLevelData.map(function (item) {
                var children = buildTree(item.id);
                if (children.length > 0) {
                    return __assign(__assign({}, item), { children: children });
                }
                else {
                    return __assign({}, item);
                }
            });
        }
        return currentLevelData;
    };
    return buildTree();
};
// export const treeToFlatten = (treeData: any[]) => {
//   const flattenData = [];
//   return flattenData;
// };
