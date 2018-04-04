import { User } from './../../models/user';
export class DataService {
    selectedUser;

    setSelectedUser(user) {
        this.selectedUser = user;
    }
    getSelectedUser() {
        return this.selectedUser;
    }

}
