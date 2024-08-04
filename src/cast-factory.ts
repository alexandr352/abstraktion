import { Cast } from './models/cast.js';
import { UserCast } from './models/user.cast.js';

export class CastFactory {
    public makeCaster(collectionName: string): Cast | undefined {
        switch (collectionName) {
            case "users":
                return new UserCast();
            default:
                return;
        }
    }
}