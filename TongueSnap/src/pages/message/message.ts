import { ConversationPage } from './../conversation/conversation';
import { SearchPractitionerPage } from './../search-practitioner/search-practitioner';
import { DashboardPage } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DataService } from '../../providers/dataservice/dataservice';
import * as _ from 'underscore';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_DI_CONFIG } from '../../app/app-config/app-config.constants';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  selectedUser: any;
  selectedPractitioner: any;
  selectedConversation: any;
  messages: any[] = [];
  messageForm: FormGroup;
  isMsgSentBefore: Boolean = false;
  key: any;
  chats: any[];
  userKey: any;
  constructor(
    private navParams: NavParams,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firebaseService: FirebaseService,
    private dataService: DataService) {
    this.key = "conv" + Math.floor(Math.random() * 90000) + 10000;
  }

  ngOnInit() {
    this.messageForm = this.fb.group({
      message: ['', Validators.required]

    });

    this.selectedUser = this.dataService.getSelectedUser();
    if (!_.isEmpty(this.selectedUser)) { this.userKey = this.selectedUser.key; console.log(this.userKey) }
    this.selectedPractitioner = this.dataService.getSelectedPractitioner();
    this.selectedConversation = this.dataService.getSelectedConversation();
    this.getConversationData();
  }
  getConversationData() {
    //this for convo loading
    if (!_.isEmpty(this.selectedConversation)) {
      console.log('coonvo selected');
      this.messages = this.selectedConversation[0].messages;
      this.formatMessages(this.messages);

    } else {
      //this for dirct messaging btn
      if (!_.isEmpty(this.selectedUser) && !_.isEmpty(this.selectedPractitioner)) {
        console.log('inside');
        if (this.selectedUser.type == APP_DI_CONFIG.TYPE_CLIENT) {
          console.log('inside client');
          this.findConversations(APP_DI_CONFIG.TYPE_CLIENT);
        } else {
          this.findConversations(APP_DI_CONFIG.TYPE_PRACTITIONER);
        }

      } else {
        this.createToast("Something went wrong!!!");
      }
    }

  }
  ionViewDidLoad() { }
  createToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  findConversations(type) {
    var pracId = this.selectedPractitioner.key;
    console.log('dir msg');
    console.log(type);
    this.firebaseService.getConversationsByUserIdAndType(type, this.selectedUser.key).subscribe((res) => {
      if (!_.isEmpty(res)) {
        console.log(res);
        if (type == APP_DI_CONFIG.TYPE_CLIENT) {
          this.selectedConversation = res.filter(function (conv) {
            return conv.practitioner === pracId;
          });
        } else {
          this.selectedConversation = res.filter(function (conv) {
            return conv.client === pracId;
          });
        }
        if (!_.isEmpty(this.selectedConversation)) {
          console.log('convo');
          console.log(this.selectedConversation);
          this.messages = this.selectedConversation[0].messages;
          console.log('msg');
          console.log(this.messages);
          this.formatMessages(this.messages);
        } else {
          this.createToast("Messaging for the first time!!!");
        }
      } else {
        this.createToast("Messaging for the first time!!!");
      }
    });
  }
  sendMessage() {
    if (!_.isEmpty(this.selectedConversation)) {
      var msgObj = {
        timeStamp: new Date(),
        userId: this.selectedUser.key,
        message: this.messageForm.value.message
      };
      this.pushToConversationByKey(this.selectedConversation[0].key, msgObj);
    } else {
      if (this.selectedUser.type == APP_DI_CONFIG.TYPE_CLIENT) {
        var convObj = {
          timeStamp: new Date(),
          client: this.selectedUser.key,
          practitioner: this.selectedPractitioner.key
        }
        this.createConversation(convObj);
      } else {
        var convPracObj = {
          timeStamp: new Date(),
          client: this.selectedConversation.client,
          practitioner: this.selectedUser.key
        }
        this.createConversation(convPracObj);
      }
    }
  }

  createConversation(convObj) {
    this.firebaseService.createConversation(this.key, JSON.parse(JSON.stringify(convObj))).then((conv) => {
      var msgObj = {
        timeStamp: new Date(),
        userId: this.selectedUser.key,
        message: this.messageForm.value.message
      };
      this.pushToConversationByKey(this.key, msgObj);
    }, error => {
      this.createToast(error);
    });
  }

  pushToConversationByKey(key, msgObj) {
    this.firebaseService.pushMessageToConversation(key, JSON.parse(JSON.stringify(msgObj))).then((msg) => {
      this.isMsgSentBefore = true;
      this.messageForm.reset();
      this.createToast("Message sent");
      this.navCtrl.push(ConversationPage);
      this.dataService.setSelectedConversation([]);
    }, error => {
      this.createToast(error);
    });
  }

  formatMessages(msgs) {
    var chatModelArray = [];
    if (!_.isEmpty(msgs)) {
      _.each(msgs, function (msg, key) {
        console.log(msg);
        var chatModel = {
          message: msg.message,
          userId: msg.userId,
          timeStamp: msg.timeStamp
        }
        chatModelArray.push(chatModel);
      }.bind(this));
      this.chats = chatModelArray;
      console.log(this.chats);
    }
  }
}
