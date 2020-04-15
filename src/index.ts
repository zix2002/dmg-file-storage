import fs from 'fs';
import lodash from 'lodash';
import { flattenToTree, TreeDataType } from './lib/tree';

export interface Store {
  [name: string]: any;
}

const FileStorage = {
  fullPath: '', // 存储的全路径
  conditionWhere: {}, // 过滤条件
  conditionSort: 'id', // 排序字段
  conditionOrder: 'desc', // 排序规则
  file(filename: string) {
    this.fullPath = `${process.cwd()}/cache/${filename}`;
    this.conditionWhere = {};
    this.conditionSort = 'id';
    this.conditionOrder = 'desc';
    return this;
  },
  // 将数据保存到文件
  setItem(data: Store | Store[]) {
    fs.writeFileSync(this.fullPath, JSON.stringify(data));
    return this;
  },
  // 从文件中获取数据
  getItem(): Store | Store[] | null {
    if (fs.existsSync(this.fullPath)) {
      const fileContent = fs.readFileSync(this.fullPath, 'utf8');
      return JSON.parse(fileContent);
    }
    return null;
  },
  // 设置排序
  orderBy(sort: string, order: string = 'desc') {
    this.conditionSort = sort;
    this.conditionOrder = order;
    return this;
  },
  // 设置过滤条件
  where(where: Store) {
    this.conditionWhere = where;
    return this;
  },
  // 设置分页
  paginate(pageSize: number = 10, page: number = 1): Store {
    const data = this.search();
    const chunkData = lodash.chunk(data, pageSize);
    const result = chunkData[page - 1] || [];
    return {
      data: result,
      pagination: {
        total: data.length,
        page,
        pageSize,
      },
    };
  },
  // 搜索
  search(): Store[] {
    const data = this.getItem();
    if (data && Array.isArray(data)) {
      const filterData = Object.keys(this.conditionWhere).length > 0 ? lodash.filter(data, this.conditionWhere) : data;
      // @ts-ignore
      return lodash.orderBy(filterData, this.conditionSort, this.conditionOrder);
    }
    return [];
  },

  // 按按条件查询单个
  find(): Store | null | undefined {
    const data = this.getItem();
    if (data && Array.isArray(data)) {
      const result = lodash.find(data, this.conditionWhere);
      return result || null;
    }
    return null;
  },
  // 添加
  create(item: Store, pk: string = 'id'): Store | null {
    const data = this.getItem();
    if (data && Array.isArray(data)) {
      const maxPk = lodash.maxBy(data, pk);
      const pkValue = maxPk ? Number(maxPk[pk]) + 1 : 1;
      const newRow = {
        ...item,
        [pk]: pkValue,
      };
      data.push(newRow);
      this.setItem(data);
      return newRow;
    }
    return null;
  },
  // 更新
  update(item: Store): Store | null {
    const data = this.getItem();
    if (data && Array.isArray(data)) {
      const needUpdateIndex = lodash.findIndex(data, this.conditionWhere);
      if (needUpdateIndex < 0) {
        return null;
      }
      const newData = data.map((row: Store, index) => {
        if (needUpdateIndex === index) {
          return {
            ...row,
            ...item,
          };
        }
        return row;
      });
      this.setItem(newData);
      return item;
    }

    return null;
  },
  // 删除单个
  destroy(): boolean {
    const data = this.getItem();
    if (data && Array.isArray(data)) {
      const findIndex = lodash.findIndex(data, this.conditionWhere);
      if (findIndex < 0) {
        return false;
      }
      lodash.remove(data, (_, index) => {
        return index === findIndex;
      });
      this.setItem(data);

      return true;
    }
    return false;
  },
  getTree(): TreeDataType[] {
    const data = this.getItem();
    if (data && Array.isArray(data)) {
      // @ts-ignore
      const orderData = lodash.orderBy(data, this.conditionSort, this.conditionOrder) as TreeDataType[];
      return flattenToTree(orderData);
    }
    return [];
  },
};

export default FileStorage;
