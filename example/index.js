import fileStorage from '../src/index';

fileStorage.file('users.json').setItem({ a: 1 });

const users = fileStorage.file('users.json').getItem();

console.log(users);
