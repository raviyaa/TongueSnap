import { PractitionerProfilePage } from './../practitioner-profile/practitioner-profile';
import { DataService } from './../../providers/dataservice/dataservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-search-practitioner',
  templateUrl: 'search-practitioner.html',
})
export class SearchPractitionerPage {

  users: any[];
  selectedPractitioners: any[] = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private DataService: DataService
  ) {
  }


  ngOnInit() {
    this.getListOfPractetioners();
  }

  getListOfPractetioners() {
    this.firebaseService.getListOfUsers().subscribe((value) => {
      this.users = value;
    });
  }
  practitionerSelected(user) {
    this.DataService.setSelectedUser(user);
    this.navCtrl.push(PractitionerProfilePage);
  }
  sendToPractitioners() {
    console.log('send to');
    console.log(this.selectedPractitioners);
  }

  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.users = this.users.filter((item) => {
        return (item.location.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.getListOfPractetioners();
    }
  }
  chekBoxClicked(user, evt) {
    if (evt.checked) {
      this.selectedPractitioners.push(user);
    } else {
      this.selectedPractitioners.splice(this.selectedPractitioners.indexOf(user));
    }
  }

  ionViewDidLoad() {
    //  console.log('ionViewDidLoad SearchPractitionerPage');
  }

}
