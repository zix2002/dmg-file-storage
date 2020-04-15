export interface TreeDataType {
    id: number;
    parentId: number | null;
    [name: string]: any;
    children?: TreeDataType[];
}
export declare const flattenToTree: (flattenData: TreeDataType[]) => TreeDataType[];
