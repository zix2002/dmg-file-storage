import fs from 'fs';

export interface Store {
  [name: string]: any;
}

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

const FileStorage = {
  fullPath: '',
  file(filename: string) {
    this.fullPath = `${process.cwd()}/cache/${filename}`;
    return this;
  },
  setItem(data: Store | Store[]) {
    fs.writeFileSync(this.fullPath, JSON.stringify(data));
    return this;
  },
  getItem() {
    if (fs.existsSync(this.fullPath)) {
      const fileContent = fs.readFileSync(this.fullPath, 'utf8');
      return JSON.parse(fileContent);
    }
    return null;
  },
};

export default FileStorage;
