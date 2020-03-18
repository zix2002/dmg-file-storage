# dmg-file-storage

主要解决在 `umijs` mock 中调用加载的自定义文件会有报错，但是加载包就不会，虽然不影响使用，但是还是做个包

## 安装及使用方法

### 安装

```
$ npm install https://github.com/zix2002/dmg-file-storage
```

### 打包

```
$ npm run build
```

### 使用

```js
import fileStorage from 'dmg-file-storage';
```

### 方法

- `setItem` 保存数据到文件

```
// 存入到 /cache/users.json
fileStorage.file('users.json').setItem([
  { id: 1, username: 'Donald', nickname: '乔丽' },
  { id: 2, username: 'Paul', nickname: '赵秀兰' },
  { id: 3, username: 'Mark', nickname: '曾涛' },
]);
```

- `getItem` 从文件中取数据

```
// 取全部数据
const users = fileStorage.file('users.json').getItem();
```

- `where` 设置过滤条件，需要`search`或`pagination`才返回对应数据

```js
fileStorage
  .file('users.json')
  .where({ username: 'Donald' })
  .search();
```

- `orderBy` 设置排序条件, 需要`search`或`pagination`才返回对应数据

```js
fileStorage
  .file('users.json')
  .orderBy('id', 'asc') // 默认id , asc
  .search();
```

- `search` 查询，配合`where`和`orderBy`使用，示例同上

- `paginate`,分页查询，配合`where`和`orderBy`使用

```js
const page = 1; // 1 是默认值
const pageSize = 10;
fileStorage
  .file('users.json')
  .orderBy('id', 'desc')
  .paginate(pageSize, page);
```

- `find` 查询单条

```js
fileStorage
  .file('users.json')
  .where({ id: 1 })
  .find();
```

- `create` 添加一行数据

```js
// 要添加的数据
const data = {
  username: 'Carol',
  nickname: '谢杰',
};
const pk = 'id'; // 主键 默认为id

fileStorage.file('users.json').create(data, pk);
```

- update 更新一行数据

```js
fileStorage
  .file('users.json')
  .where({ id: 1 })
  .update({
    username: 'Carol',
    nickname: '谢杰',
  });
```

- destroy 删除一行数据

```js
fileStorage
  .file('users.json')
  .where({ id: 1 })
  .destroy();
```

## 如何配合`umijs` 的 mock

- 先建立一个路由，例如：`/api/seed/users`
- 通过`mockjs`, 生成模拟数据
- 通过`fileStorage.setItem`, 存入指定文件, 如`users.json`
- 再新建用于 mock 的路由，如`/api/users`, 通过 `fileStorage.search`方法进行查询,并返回
