import { DataService } from './../../providers/dataservice/dataservice';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@ionic-native/call-number';
import * as _ from 'underscore';

@IonicPage()
@Component({
  selector: 'page-practitioner-profile',
  templateUrl: 'practitioner-profile.html',
})
export class PractitionerProfilePage {
  user: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    public firebaseService: FirebaseService,
    public translateService: TranslateService,
    public dataService: DataService,
    private callNumber: CallNumber
  ) {

  }
  ngOnInit() {
    this.loadSelectedUser();
  }
  ionViewDidLoad() {

  }
  loadSelectedUser() {
    this.user = !_.isEmpty(this.dataService.getSelectedPractitioner()) ? this.dataService.getSelectedPractitioner() : this.dataService.getSelectedUser();
  }

  goToCall() {
    if (!_.isEmpty(this.user.phone)) {
      this.callNumber.callNumber(this.user.phone, true)
        .then(res => alert(res))
        .catch(err => alert(err));
    } else {
      this.createToast("No Tel available");
    }
  }
  createToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  makeAppoinment() {
    console.log('make appoinment');
  }
}
