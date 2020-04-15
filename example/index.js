import fileStorage from '../src/index';

// fileStorage.file('users.json').setItem({ a: 1 });
// const users = fileStorage.file('users.json').paginate(3, 1);
const groups = fileStorage.file('groups.json').getTree();

// const users = fileStorage.file('users.json').search();
console.log(JSON.stringify(groups, null, 4));
