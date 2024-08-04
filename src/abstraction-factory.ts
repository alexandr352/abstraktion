import { Cast } from './models/cast.js';
import { CastFactory } from './cast-factory.js';
import { DataAbstraction } from './data-abstraction.js';

export class DataAbstractionFactory extends DataAbstraction {
    private _caster: Cast | undefined;

    public constructor(
        private _collectionName: string
    ) {
        super();
        const factory = new CastFactory();
        this._caster = factory.makeCaster(this._collectionName);
    }

    public fetch = async (): Promise<any> => {
        try {
            const result = await this.getItems(this._collectionName);
            return result;
        } catch (error) {
            throw({
                message: `
                    DataAbstractionFactory:
                    Error fetching from ${this._collectionName} collection
                `,
                error
            });
        }
    }

    public insert = async (item: any): Promise<any> => {
        const insertable = this._caster ? this._caster.castObject(item) : item;
        if (insertable == null) {
            throw({
                message: `
                    DataAbstractionFactory:
                    Types mismatch while inserting in ${this._collectionName} collection
                `
            });
        }
        try {
            const insertedItem = await this.addItem(this._collectionName, insertable);
            return this._caster ? this._caster.castObject(insertedItem) : insertedItem;
        } catch (error) {
            throw({
                message: `
                    DataAbstractionFactory:
                    Error inserting in ${this._collectionName} collection
                `,
                error
            });
        }
    }

    public find = async (field: string, value: string): Promise<any> => {
        try {
            const items = await this.findItems(this._collectionName, field, value);
            return this._caster ? this._caster.castArray(items) : items;
        } catch (error) {
            throw({
                message: `
                    DataAbstractionFactory:
                    Error searching in ${this._collectionName} collection
                `,
                error
            });
        }
    }

    public item = async (id: string): Promise<any> => {
        try {
            const item = await this.findItemById(this._collectionName, id);
            return this._caster ? this._caster?.castObject(item) : item;
        } catch (error) {
            throw({
                message: `
                    DataAbstractionFactory:
                    Error searching item in ${this._collectionName} collection
                `,
                error
            });
        }
    }

    public remove = async (id: string): Promise<any> => {
        try {
            const deletionResult = await this.removeItemById(this._collectionName, id);
            return deletionResult;
        } catch(error) {
            throw({
                message: `
                    DataAbstractionFactory:
                    Error removing item from ${this._collectionName} collection
                `,
                error
            });
        }
    }

    public replace = async (id: string, item: any): Promise<any> => {
        const insertable = this._caster ? this._caster.castObject(item) : item;
        if (insertable == null) {
            throw({
                message: `
                    DataAbstractionFactory:
                    Types mismatch while replacing item in ${this._collectionName} collection
                `
            });
        }
        try {
            const updatedItem = await this.replaceItemById(this._collectionName, id, insertable);
            return this._caster ? this._caster.castObject(updatedItem) : updatedItem;
        } catch (error) {
            throw({
                message: `
                    DataAbstractionFactory:
                    Error replacing item in ${this._collectionName} collection
                `,
                error
            });
        }
    }
}