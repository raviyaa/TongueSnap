import { PractitionerProfilePage } from './../../pages/practitioner-profile/practitioner-profile';
import { Component } from '@angular/core';
import { ViewController, NavParams, NavController, ToastController } from 'ionic-angular';
import { DataService } from '../../providers/dataservice/dataservice';

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {
  data: any;
  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private dataService: DataService,
  ) {
    this.data = this.navParams.data;
  }

  close() {
    this.viewCtrl.dismiss();
  }
  message() {

  }
  viewProfile() {
    this.dataService.setSelectedPractitioner(this.data);
    this.navCtrl.push(PractitionerProfilePage);
  }
}
