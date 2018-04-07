import { MessagePage } from './../message/message';
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
  user: any;
  users: any[] = [];
  conversation: any[] = [];
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
        this.firebaseService.getConversationsByUserIdAndType(this.selectedUser.type, this.selectedUser.key).subscribe((conversation) => {
          if (!_.isEmpty(conversation)) {
            if (this.selectedUser.type == APP_DI_CONFIG.TYPE_CLIENT) {
              _.each(conversation, function (conv, key) {
                this.firebaseService.findUserByKey(conv.practitioner).subscribe((user) => {
                  conv.user = user;
                });
              }.bind(this));
              this.conversation = conversation;
            }
            if (this.selectedUser.type == APP_DI_CONFIG.TYPE_PRACTITIONER) {
            }
          } else {
            this.createToast("Messaging for the first time!!!");
          }
        });
      }
      if (this.selectedUser.type == APP_DI_CONFIG.TYPE_PRACTITIONER) {
        this.firebaseService.getConversationsByUserIdAndType(this.selectedUser.type, this.selectedUser.key).subscribe((conversation) => {
          console.log(conversation);
          if (!_.isEmpty(conversation)) {
            if (this.selectedUser.type == APP_DI_CONFIG.TYPE_PRACTITIONER) {
              _.each(conversation, function (conv, key) {
                this.firebaseService.findUserByKey(conv.client).subscribe((user) => {
                  console.log(user);
                  conv.user = user;
                });
              }.bind(this));
              this.conversation = conversation;
            }
            if (this.selectedUser.type == APP_DI_CONFIG.TYPE_PRACTITIONER) {
            }
          } else {
            this.createToast("Messaging for the first time!!!");
          }
        });
      }
    }
    console.log(this.users);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }

  createToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  findConversations(type) {
    console.log('dir msg');
    console.log(type);
    this.firebaseService.getConversationsByUserIdAndType(type, this.selectedUser.key).subscribe((res) => {
      if (!_.isEmpty(res)) {
        console.log(res);
        if (type == APP_DI_CONFIG.TYPE_CLIENT) {
          _.each(res, function (conv, key) {
            this.findUserByKey(conv.practitioner);
            this.users.push(this.user);
          }.bind(this));
        }
        if (type == APP_DI_CONFIG.TYPE_PRACTITIONER) {
        }
      } else {
        this.createToast("Messaging for the first time!!!");
      }
    });
  }

  async  findUserByKey(key) {
    await this.firebaseService.findUserByKey(key).subscribe((user) => {
      this.user = user;
    });
    console.log('dsdfsd');
  }
  convClicled(item) {
    var convoArray = [];
    convoArray.push(item);
    this.dataService.setSelectedConversation(convoArray);
    this.navCtrl.push(MessagePage);
  }
}
