import { ViewSnapPage } from './../view-snap/view-snap';
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
  inquires: any[];
  selectedInquire: any;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private dataSerivce: DataService) {
  }
  ngOnInit() {
    this.getInitData();
  }
  getInitData() {
    var filteredSnaps = [];
    this.user = this.dataSerivce.getSelectedUser();
    if (!_.isEmpty(this.user)) {
      this.firebaseService.getListOfSnaps().subscribe((snaps) => {
        if (!_.isEmpty(snaps)) {
          _.each(snaps, function (snap, key) {

            if (!_.isEmpty(snap.practitioners)) {
              if (!_.isEmpty(snap.comments)) {
                var formattedComments = [];
                let commentString;
                _.each(snap.comments, function (comm, key) {
                  if (!_.isEmpty(comm.practitioner)) {
                    if (comm.practitioner.key === this.user.key) {
                      commentString = comm.comment;
                      formattedComments.push(commentString);
                    }
                  }
                }.bind(this));
                snap.formattedComments = formattedComments;
              }

              var practitioners = snap.practitioners;
              _.each(practitioners, function (prac, key) {
                if (prac.key === this.user.key) {
                  filteredSnaps.push(snap);
                }
              }.bind(this));
            }

          }.bind(this));
        }
        console.log(filteredSnaps);
        this.inquires = filteredSnaps;
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
  itemClicked(item) {
    console.log(item);
    this.dataSerivce.setSelcetedInquire(item);
    this.navCtrl.push(ViewSnapPage);
  }

}
