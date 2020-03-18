import fileStorage from '../src/index';

// fileStorage.file('users.json').setItem({ a: 1 });
fileStorage
  .file('users.json')
  .where({ id: 11 })
  .destroy();

const users = fileStorage.file('users.json').search();
console.log(users);
