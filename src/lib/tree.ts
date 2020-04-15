export interface TreeDataType {
  id: number;
  parentId: number | null;
  [name: string]: any;
  children?: TreeDataType[];
}

export const flattenToTree = (flattenData: TreeDataType[]): TreeDataType[] => {
  const buildTree = (parentId: null | number = null): TreeDataType[] => {
    const currentLevelData = flattenData.filter(item => item.parentId === parentId);
    if (currentLevelData.length > 0) {
      return currentLevelData.map(item => {
        const children = buildTree(item.id);
        if (children.length > 0) {
          return { ...item, children };
        } else {
          return { ...item };
        }
      });
    }
    return currentLevelData;
  };

  return buildTree();
};

// export const treeToFlatten = (treeData: any[]) => {
//   const flattenData = [];
//   return flattenData;
// };
