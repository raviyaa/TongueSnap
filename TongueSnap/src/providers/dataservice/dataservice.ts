import { User } from './../../models/user';
export class DataService {
    selectedUser;
    selectedImage;
    selectedDescription;

    setSelectedUser(user) {
        this.selectedUser = user;
    }
    getSelectedUser() {
        return this.selectedUser;
    }

    setSelectedImage(image) {
        this.selectedImage = image;
    }
    getSelectedImage() {
        return this.selectedImage;
    }

    setSelectedDescription(desc) {
        this.selectedDescription = desc;
    }

    getSelectedDescription() {
        return this.selectedDescription;
    }
}
