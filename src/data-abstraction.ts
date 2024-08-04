import { IImplementor } from './implementor.js';
import { MongodbImplementor } from './mongodb.implementor.js';

export abstract class DataAbstraction {
    public abstract fetch: () => Promise<any>;
    public abstract insert: (item: any) => Promise<any>;
    public abstract find: (field: string, value: string) => Promise<any>;
    public abstract item: (id: string) => Promise<any>;
    public abstract remove: (id: string) => Promise<any>;
    public abstract replace: (id: string, item: any) => Promise<any>;

    private _implementor: IImplementor = MongodbImplementor.instance();

    protected getItems = (collectionName: string): Promise<any> => {
        return this._implementor.getItemsImplementation(collectionName);
    }

    protected addItem = (collectionName: string, item: any): Promise<any> => {
        return this._implementor.addItemImplementation(collectionName, item);
    }

    protected findItems = (collectionName: string, field: string, value: string): Promise<any> => {
        return this._implementor.findItemsImplementation(collectionName, field, value);
    }

    protected findItemById = (collectionName: string, id: string): Promise<any> => {
        return this._implementor.findItemByIdImplementation(collectionName, id);
    }

    protected removeItemById = (collectionName: string, id: string): Promise<any> => {
        return this._implementor.removeItemByIdImplementation(collectionName, id);
    }

    protected replaceItemById = (collectionName: string, id: string, item: any): Promise<any> => {
        return this._implementor.replaceItemByIdImplementation(collectionName, id, item);
    }
}