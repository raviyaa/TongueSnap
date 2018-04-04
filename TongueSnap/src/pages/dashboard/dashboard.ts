import { ConversationPage } from './../conversation/conversation';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedbackPage } from '../feedback/feedback';
import { FavouritePage } from '../favourite/favourite';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  tab1Root = FeedbackPage;
  tab2Root = FavouritePage;
  tab3Root = ConversationPage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
