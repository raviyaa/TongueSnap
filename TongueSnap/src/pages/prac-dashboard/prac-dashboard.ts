import { InquirePage } from './../inquire/inquire';
import { PractitionerProfilePage } from './../practitioner-profile/practitioner-profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation';


@IonicPage()
@Component({
  selector: 'page-prac-dashboard',
  templateUrl: 'prac-dashboard.html',
})
export class PracDashboardPage {

  tab1Root = PractitionerProfilePage;
  tab2Root = InquirePage;
  tab3Root = ConversationPage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   
  }

}
