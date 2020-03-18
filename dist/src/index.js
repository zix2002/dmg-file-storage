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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var lodash_1 = __importDefault(require("lodash"));
var FileStorage = {
    fullPath: '',
    conditionWhere: {},
    conditionSort: 'id',
    conditionOrder: 'desc',
    file: function (filename) {
        this.fullPath = process.cwd() + "/cache/" + filename;
        this.conditionWhere = {};
        this.conditionSort = 'id';
        this.conditionOrder = 'desc';
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
    orderBy: function (sort, order) {
        if (order === void 0) { order = 'desc'; }
        this.conditionSort = sort;
        this.conditionOrder = order;
        return this;
    },
    where: function (where) {
        this.conditionWhere = where;
        return this;
    },
    pagination: function (pageSize, page) {
        if (pageSize === void 0) { pageSize = 10; }
        if (page === void 0) { page = 1; }
        var data = this.search();
        var chunkData = lodash_1.default.chunk(this.search(), pageSize);
        var result = chunkData[page - 1] || [];
        return {
            data: result,
            pagination: {
                total: data.length,
                page: page,
                pageSize: pageSize,
            },
        };
    },
    // 搜索
    search: function () {
        var data = this.getItem();
        if (data && Array.isArray(data)) {
            var filterData = Object.keys(this.conditionWhere).length > 0 ? lodash_1.default.filter(data, this.conditionWhere) : data;
            // @ts-ignore
            return lodash_1.default.orderBy(filterData, this.conditionSort, this.conditionOrder);
        }
        return [];
    },
    // 按键值查询单个
    find: function () {
        var data = this.getItem();
        if (data && Array.isArray(data)) {
            var result = lodash_1.default.find(data, this.conditionWhere);
            return result || null;
        }
        return null;
    },
    // 添加
    create: function (item, pk) {
        var _a;
        if (pk === void 0) { pk = 'id'; }
        var data = this.getItem();
        if (data && Array.isArray(data)) {
            var maxPk = lodash_1.default.maxBy(data, pk);
            var pkValue = maxPk ? Number(maxPk[pk]) + 1 : 1;
            var newRow = __assign(__assign({}, item), (_a = {}, _a[pk] = pkValue, _a));
            data.push(newRow);
            this.setItem(data);
            return newRow;
        }
        return null;
    },
    // 更新
    update: function (item) {
        var data = this.getItem();
        if (data && Array.isArray(data)) {
            var needUpdateIndex_1 = lodash_1.default.findIndex(data, this.conditionWhere);
            if (needUpdateIndex_1 < 0) {
                return null;
            }
            var newData = data.map(function (row, index) {
                if (needUpdateIndex_1 === index) {
                    return __assign(__assign({}, row), item);
                }
                return row;
            });
            this.setItem(newData);
            return item;
        }
        return null;
    },
    destroy: function () {
        var data = this.getItem();
        if (data && Array.isArray(data)) {
            var findIndex_1 = lodash_1.default.findIndex(data, this.conditionWhere);
            if (findIndex_1 < 0) {
                return false;
            }
            lodash_1.default.remove(data, function (_, index) {
                return index === findIndex_1;
            });
            this.setItem(data);
            return true;
        }
        return false;
    },
};
exports.default = FileStorage;
