import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as _ from 'underscore';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../providers/dataservice/dataservice';

@IonicPage()
@Component({
  selector: 'page-inquire',
  templateUrl: 'inquire.html',
})
export class InquirePage {
  user: any;
  inquies: any[];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private dataSerivce: DataService, ) {
  }
  ngOnInit() {
    this.getInitData();
  }
  getInitData() {
    this.user = this.dataSerivce.getSelectedUser();
    if (!_.isEmpty(this.user.key)) {
      this.firebaseService.getListOfSnaps().subscribe((snaps) => {
        if (!_.isEmpty(snaps)) {
          _.each(snaps, function (snap, key) {
            if (!_.isEmpty(snap.practitioners)) {
              var practitioners = snap.practitioners;
              _.each(practitioners, function (prac, key) {
                if (prac.key === this.user.key) {
                  console.log(snap);
                  this.snap.push(snap);
                }
              });
            }
          });
        }
      }, error => {
        this.createToast(error);
      });
    } else {
      this.createToast("Something went wrong!");
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
}
