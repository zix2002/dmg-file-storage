export interface Store {
    [name: string]: any;
}
export interface TreeDataType {
    id: number;
    parentId: number | null;
    [name: string]: any;
    children?: TreeDataType[];
}
export declare const flattenToTree: (flattenData: TreeDataType[]) => TreeDataType[];
declare const FileStorage: {
    fullPath: string;
    conditionWhere: {};
    conditionSort: string;
    conditionOrder: string;
    file(filename: string): any;
    setItem(data: Store | Store[]): any;
    getItem(): Store | Store[] | null;
    orderBy(sort: string, order?: string): any;
    where(where: Store): any;
    paginate(pageSize?: number, page?: number): Store;
    search(): Store[];
    find(): Store | null | undefined;
    create(item: Store, pk?: string): Store | null;
    update(item: Store): Store | null;
    destroy(): boolean;
    getTree(): TreeDataType[];
};
export default FileStorage;
