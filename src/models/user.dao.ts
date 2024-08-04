import { ObjectId } from 'mongodb';

export class UserDAO {
    public _id: string | ObjectId;

    public constructor(
        public username: string,
        public password: string,
        _id?: string | ObjectId,
    ) {
        if (_id != null) {
            if (_id instanceof ObjectId) {
                this._id = _id.toHexString();
            } else {
                this._id = _id;
            }
        }
    }
}