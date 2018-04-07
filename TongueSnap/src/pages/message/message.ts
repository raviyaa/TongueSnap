import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DataService } from '../../providers/dataservice/dataservice';
import * as _ from 'underscore';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    this.selectedPractitioner = this.dataService.getSelectedPractitioner();
    this.selectedConversation = this.dataService.getSelectedConversation();
    this.getConversationData();
  }
  getConversationData() {
    //this for convo loading
    if (!_.isEmpty(this.selectedConversation)) {
      console.log('convo availbe');
      this.firebaseService.getConversationsByKey(this.selectedUser.key).subscribe((res) => {
        console.log(res);
        //this.messages = res;
      });
    } else {
      //this for dirct messaging btn
      if (!_.isEmpty(this.selectedUser) && !_.isEmpty(this.selectedPractitioner)) {
        console.log('dir msg');
        this.firebaseService.getConversationsByUserId(this.selectedUser.key).subscribe((res) => {
          if (!_.isEmpty(res)) {
            console.log(res);
            /*  this.selectedConversation = res.filter(function (conv) {
               return conv.reserverId === this.selectedPractitioner;
             }); */
          } else {
            this.createToast("Messaging for the first time!!!");
          }
        });
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

  sendMessage() {
    if (!_.isEmpty(this.selectedConversation)) {
      console.log('if');
    } else {
      //const key = "conv" + Math.floor(Date.now() / 1000);
      if (this.isMsgSentBefore) {
        console.log('is true');
        var msgObj = {
          timeStamp: new Date(),
          senderId: this.selectedUser,
          receiverId: this.selectedPractitioner,
          message: this.messageForm.value.message
        };
        this.firebaseService.pushMessageToConversation(this.key, JSON.parse(JSON.stringify(msgObj))).then((msg) => {
          this.isMsgSentBefore = true;
          this.messageForm.reset();
          this.createToast("Message sent");
        }, error => {
          this.createToast(error);
        });
      } else {
        console.log('is false');
        var convObj = {
          timeStamp: new Date(),
          senderId: this.selectedUser,
          receiverId: this.selectedPractitioner
        }
        this.firebaseService.createConversation(this.key, JSON.parse(JSON.stringify(convObj))).then((conv) => {
          var msgObj = {
            timeStamp: new Date(),
            senderId: this.selectedUser,
            receiverId: this.selectedPractitioner,
            message: this.messageForm.value.message
          };
          this.firebaseService.pushMessageToConversation(this.key, JSON.parse(JSON.stringify(msgObj))).then((msg) => {
            this.isMsgSentBefore = true;
            this.messageForm.reset();
            this.createToast("Message sent");
          }, error => {
            this.createToast(error);
          });
        }, error => {
          this.createToast(error);
        });
      }
    }
  }
}
