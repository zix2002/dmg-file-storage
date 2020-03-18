export interface Store {
    [name: string]: any;
}
declare const FileStorage: {
    fullPath: string;
    file(filename: string): any;
    setItem(data: Store | Store[]): any;
    getItem(): any;
};
export default FileStorage;
