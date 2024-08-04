import * as mongodb from 'mongodb';
import { IImplementor } from './implementor';

const DATABASE_NAME: string = 'mydb';
const DATABASE_HOST: string = 'localhost';
const DATABASE_PORT: number = 27017;

export class MongodbImplementor implements IImplementor {
    public static instance = (): IImplementor => {
        if (MongodbImplementor._instance == null) {
            MongodbImplementor._instance = new MongodbImplementor();
        }
        return MongodbImplementor._instance;
    }
    private static _instance: MongodbImplementor | null = null;
    private static _dbPromise: Promise<any> | null = null;

    protected constructor() { }

    public getItemsImplementation = async (collectionName: string): Promise<mongodb.WithId<mongodb.BSON.Document>[]> => {
        try {
            const collection = await this.getCollection(collectionName);
            return collection.find().toArray();
        } catch (error) {
            throw error;
        }
    }

    public addItemImplementation = async (collectionName: string, item: any): Promise<mongodb.WithId<mongodb.BSON.Document> | null> => {
        this.toMongoObjectsID(item);
        try {
            const collection = await this.getCollection(collectionName);
            const { insertedId } = await collection.insertOne(item);
            return this.findItemByIdImplementation(collectionName, insertedId.toHexString());
        } catch (error) {
            throw error;
        }
    }

    public findItemByIdImplementation = async (collectionName: string, id: string): Promise<mongodb.WithId<mongodb.BSON.Document> | null> => {
        const searchQuery = {
            _id: new mongodb.ObjectId(id),
        };
        try {
            const collection = await this.getCollection(collectionName);
            return collection.findOne(searchQuery);
        } catch (error) {
            throw error;
        }
    }

    public findItemsImplementation = async (collectionName: string, field: string, value: string): Promise<mongodb.WithId<mongodb.BSON.Document>[]> => {
        const searchQuery: any = {};
        const re = /.*\_id\b|^id\b/;
        if (!re.test(field)) {
            searchQuery[field] = value;
        } else {
            searchQuery[field] = new mongodb.ObjectId(value);
        }
        try {
            const collection = await this.getCollection(collectionName);
            return collection.find(searchQuery).toArray();
        } catch (error) {
            throw error;
        }
    }

    public removeItemByIdImplementation = async (collectionName: string, id: string): Promise<mongodb.DeleteResult> => {
        const searchQuery = {
            _id: new mongodb.ObjectId(id),
        };
        try {
            const collection = await this.getCollection(collectionName);
            return collection.deleteOne(searchQuery);
        } catch (error) {
            throw error;
        }
    }

    public replaceItemByIdImplementation = async (collectionName: string, id: string, item: any): Promise<mongodb.WithId<mongodb.BSON.Document> | null> => {
        const searchQuery = {
            _id: new mongodb.ObjectId(id),
        };
        this.toMongoObjectsID(item);
        try {
            const collection = await this.getCollection(collectionName);
            const updateResult = await collection.updateOne(searchQuery, item);
            if (item.hasOwnProperty("_id")) {
                return item
            } else if (updateResult.upsertedId) {
                return collection.findOne({_id: updateResult.upsertedId});
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    private getCollection = async (collectionName: string): Promise<mongodb.Collection> => {
        try {
            const db: mongodb.Db = await this.getDb();
            return db.collection(collectionName);
        } catch (error) {
            throw error;
        }
    }

    private getDb = async (): Promise<mongodb.Db> => {
        if (MongodbImplementor._dbPromise == null) {
            MongodbImplementor._dbPromise = this.getNewDbConnection();
        }
        return MongodbImplementor._dbPromise;
    }

    private getNewDbConnection = async (): Promise<mongodb.Db> => {
        const client = await mongodb.MongoClient.connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/`);
        return client.db(DATABASE_NAME);
    }

    private toMongoObjectsID(item: any): any {
        const re = /.*\_id\b|^id\b/;
        for (const index in item) {
            if (re.test(index)) {
                item[index] = mongodb.ObjectId.createFromTime(item[index]);
            }
        }
    }
}