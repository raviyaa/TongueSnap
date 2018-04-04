import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-practitioner-profile',
  templateUrl: 'practitioner-profile.html',
})
export class PractitionerProfilePage {

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    public firebaseService: FirebaseService,
    public translateService: TranslateService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PractitionerProfilePage');
  }

}
