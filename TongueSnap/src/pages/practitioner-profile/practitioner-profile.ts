import { DataService } from './../../providers/dataservice/dataservice';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-practitioner-profile',
  templateUrl: 'practitioner-profile.html',
})
export class PractitionerProfilePage {
  user: User;

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
    this.user = this.dataService.getSelectedUser();
    console.log(this.user);
  }

  goToCall() {
    console.log('call');
    //encodeURIComponent('13464834348');
    this.callNumber.callNumber("18001010101", true)
      .then(res => alert(res))
      .catch(err => alert(err));
  }

  makeAppoinment() {
    console.log('make appoinment');
  }
}
