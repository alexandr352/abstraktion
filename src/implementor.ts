export interface IImplementor {
    getItemsImplementation: (collectionName: string) => Promise<any>;
    addItemImplementation: (collectionName: string, item: any) => Promise<any>;
    findItemsImplementation: (collectionName: string, field: string, value: string) => Promise<any>;
    findItemByIdImplementation: (collectionName: string, id: string) => Promise<any>;
    removeItemByIdImplementation: (collectionName: string, id: string) => Promise<any>;
    replaceItemByIdImplementation: (collectionName: string, id: string, item: any) => Promise<any>;
}