import { DashboardPage } from './../dashboard/dashboard';
import { PractitionerProfilePage } from './../practitioner-profile/practitioner-profile';
import { DataService } from './../../providers/dataservice/dataservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { TranslateService } from '@ngx-translate/core';
import { APP_DI_CONFIG } from '../../app/app-config/app-config.constants';
import * as async from 'async';
import * as _ from 'underscore';


@IonicPage()
@Component({
  selector: 'page-search-practitioner',
  templateUrl: 'search-practitioner.html',
})
export class SearchPractitionerPage {

  users: any[];
  selectedPractitioners: any[] = [];
  selectedImage: string;
  selectedDescription: string;
  selectedUser: any;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private dataService: DataService
  ) {
  }


  ngOnInit() {
    this.getListOfPractetioners();
    this.getInitData();
  }
  getInitData() {
    this.selectedImage = this.dataService.getSelectedImage();
    this.selectedDescription = this.dataService.getSelectedDescription();
    this.selectedUser = this.dataService.getSelectedUser();
  }
  getListOfPractetioners() {
    this.firebaseService.fingUsersByType(APP_DI_CONFIG.TYPE_PRACTITIONER).subscribe(users => {
      this.users = users;
    });
  }
  practitionerSelected(user) {
    this.dataService.setSelectedUser(user);
    this.navCtrl.push(PractitionerProfilePage);
  }
  sendToPractitioners() {
    if (!_.isEmpty(this.selectedImage) && !_.isEmpty(this.selectedDescription) && !_.isEmpty(this.selectedPractitioners)) {

      var snapObj = {
        imageUrl: this.selectedImage,
        description: this.selectedDescription,
        practitioners: this.selectedPractitioners,
        patientId: this.selectedUser.key
      };
      const key = APP_DI_CONFIG.KEY_SNAP + Math.floor(Date.now() / 1000);
      this.firebaseService.createSnap(key, snapObj).then((user) => {
        this.navCtrl.push(DashboardPage);
      }, error => {
        this.createToast(error);
      });

    } else {
      this.createToast("Please select practitioners");
    }


  }

  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.users = this.users.filter((item) => {
        return (item.location.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.getListOfPractetioners();
    }
  }
  chekBoxClicked(user, evt) {
    if (evt.checked) {
      this.selectedPractitioners.push(user);
    } else {
      this.selectedPractitioners.splice(this.selectedPractitioners.indexOf(user));
    }
  }

  ionViewDidLoad() {
    //  console.log('ionViewDidLoad SearchPractitionerPage');
  }
  createToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
