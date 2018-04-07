import { User } from './../../models/user';
export class DataService {
    selectedUser;
    selectedImage;
    selectedDescription;
    selectedInquire;
    selectedPractitioner;

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
    setSelcetedInquire(inc) {
        this.selectedInquire = inc;
    }
    getSelectedInquire() {
        return this.selectedInquire;
    }
    setSelectedPractitioner(prac) {
        this.selectedPractitioner = prac;
    }
    getSelectedPractitioner() {
        return this.selectedPractitioner;
    }
}
