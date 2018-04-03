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

  ionViewDidLoad() {
    console.log('ionViewDidLoad TypeSelectionPage');
  }

  gotoClient(){
    this.navCtrl.push(SignupPage);
  }
  gotoPractitioner(){

  }
}
