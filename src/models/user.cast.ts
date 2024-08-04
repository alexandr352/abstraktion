import { Cast } from './cast.js';
import { UserDAO } from './user.dao.js';

export class UserCast extends Cast {
    public castObject = (item: any): UserDAO | undefined => {
        if (
            !item.hasOwnProperty('username')
            || !item.hasOwnProperty('password')
        ) {
            return;
        }
        return new UserDAO(item.username, item.password, item._id);
    }
}