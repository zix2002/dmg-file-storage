# dmg-file-storage

主要解决在 `umijs` mock 中调用加载的自定义文件会有报错，但是加载包就不会，虽然不影响使用，但是还是做个包

## 安装及使用方法

### 安装

```
$ npm install https://github.com/zix2002/dmg-file-storage
```

### 使用

```js
import fileStorage from 'dmg-file-storage';

// 存入到 /cache/users.json
fileStorage.file('users.json').setItem({ a: 1 });

// 取数据
const users = fileStorage.file('users.json').getItem();
```
