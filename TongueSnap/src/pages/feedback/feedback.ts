import { DataService } from './../../providers/dataservice/dataservice';
import { CreateSnapPage } from './../create-snap/create-snap';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as _ from 'underscore';

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  snaps: any[];
  base64Image: string;
  user: any;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private dataSerivce: DataService,
    private camera: Camera) {
  }

  ngOnInit() {
    this.getInitData();
  }
  getInitData() {
    this.user = this.dataSerivce.getSelectedUser();
    if (!_.isEmpty(this.user.key)) {
      this.firebaseService.getListOfSnapsByPatientId(this.user.key).subscribe((snaps) => {
        console.log(snaps);
        this.snaps = snaps;
      }, error => {
        this.createToast(error);
      });
    } else {
      this.createToast("Something went wrong!");
    }
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad FeedbackPage');
  }

  openCamera() {
    this.dataSerivce.setSelectedImage("no image");
    this.navCtrl.push(CreateSnapPage);
    /*  const cameraOptions: CameraOptions = {
       quality: 50,
       destinationType: this.camera.DestinationType.DATA_URL,
       encodingType: this.camera.EncodingType.JPEG,
       mediaType: this.camera.MediaType.PICTURE,
     };
 
     this.camera.getPicture(cameraOptions).then((imageData) => {
       this.base64Image = 'data:image/jpeg;base64,' + imageData;
       this.dataSerivce.setSelectedImage(this.base64Image);
       this.navCtrl.push(CreateSnapPage);
     }, (error) => {
       this.createToast(error);
     }); */
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
