import { PracDashboardPage } from './../prac-dashboard/prac-dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../providers/dataservice/dataservice';
import * as _ from 'underscore';

@IonicPage()
@Component({
  selector: 'page-view-snap',
  templateUrl: 'view-snap.html',
})
export class ViewSnapPage {

  selectedInquire: any;
  base64Image: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private dataSerivce: DataService,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewSnapPage');
  }
  ngOnInit() {
    this.selectedInquire = this.dataSerivce.getSelectedInquire();
    this.base64Image = this.selectedInquire.imageUrl;
  }

  comment() {
    this.presentPrompt();
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: this.selectedInquire.description,
      inputs: [
        {
          name: 'comment',
          placeholder: 'Comment on this!'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Comment',
          handler: data => {
            if (!_.isEmpty(data.comment)) {
              this.firebaseService.pushCommentToSnap(this.selectedInquire.key, data.comment).then((snap) => {
                console.log(snap);
                this.navCtrl.push(PracDashboardPage);
              }, error => {
                this.createToast(error);
              });
            } else {
              this.createToast("Comment field cannot be empty!!!");
            }
          }
        }
      ]
    });
    alert.present();
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
