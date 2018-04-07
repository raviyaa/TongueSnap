import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { DataService } from '../../providers/dataservice/dataservice';
import * as _ from 'underscore';
import { APP_DI_CONFIG } from '../../app/app-config/app-config.constants';

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {

  selectedUser: any;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firebaseService: FirebaseService,
    private dataService: DataService) {
  }
  ngOnInit() {
    this.getInitData();
  }

  getInitData() {
    this.selectedUser = this.dataService.getSelectedUser();
    if (!_.isEmpty(this.selectedUser)) {
      if (this.selectedUser.type == APP_DI_CONFIG.TYPE_CLIENT) {

      }
      if (this.selectedUser.type == APP_DI_CONFIG.TYPE_PRACTITIONER) {

      }
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }
  getConversationsByUserId() {
    this.firebaseService.getConversationsByUserId(this.selectedUser.key).subscribe((res) => {
      if (!_.isEmpty(res)) {

      } else {
        this.createToast("Messaging for the first time!!!");
      }
    });
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
