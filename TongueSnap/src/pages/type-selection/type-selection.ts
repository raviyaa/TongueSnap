import { PracSignupPage } from './../prac-signup/prac-signup';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-type-selection',
  templateUrl: 'type-selection.html',
})
export class TypeSelectionPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams) {
  }

  gotoClient(){
    this.navCtrl.push(SignupPage);
  }
  gotoPractitioner(){
    this.navCtrl.push(PracSignupPage);
  }
}
