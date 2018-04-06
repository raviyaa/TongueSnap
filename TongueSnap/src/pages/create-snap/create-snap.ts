import { SearchPractitionerPage } from './../search-practitioner/search-practitioner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../providers/dataservice/dataservice';
import * as _ from 'underscore';

@IonicPage()
@Component({
  selector: 'page-create-snap',
  templateUrl: 'create-snap.html',
})
export class CreateSnapPage {
  createSnapForm: FormGroup;
  base64Image: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private dataService: DataService) {
  }
  ngOnInit() {
    this.createSnapForm = this.fb.group({
      description: ['', Validators.required]
    });
    this.base64Image = this.dataService.getSelectedImage();
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad CreateSnapPage');
  }
  navigateToPracSearch() {
    if (this.createSnapForm.dirty && this.createSnapForm.valid && !_.isEmpty(this.base64Image)) {
      this.dataService.setSelectedDescription(this.createSnapForm.value.description);
      this.navCtrl.push(SearchPractitionerPage);
    }
    else {
      this.createToast("Something went wrong!");
    }
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
