import { PracSignupPage } from './../prac-signup/prac-signup';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APP_DI_CONFIG } from '../../app/app-config/app-config.constants';

@IonicPage()
@Component({
  selector: 'page-type-selection',
  templateUrl: 'type-selection.html',
})
export class TypeSelectionPage {

  logoUrl: string = APP_DI_CONFIG.LOGO_URL;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  gotoClient() {
    this.navCtrl.push(SignupPage);
  }
  gotoPractitioner() {
    this.navCtrl.push(PracSignupPage);
  }
}
