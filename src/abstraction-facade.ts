import { DataAbstractionFactory } from './abstraction-factory.js';
import { DataAbstraction } from './data-abstraction.js';

export class DataAbstractionFacade {
    public static instance = (): DataAbstractionFacade => {
        if (DataAbstractionFacade._instance == null) {
            DataAbstractionFacade._instance = new DataAbstractionFacade();
        }
        return DataAbstractionFacade._instance;
    }
    private static _instance: DataAbstractionFacade | null = null;

    public users: DataAbstraction;

    protected constructor() {
        this.users = new DataAbstractionFactory("users");
    }
}
