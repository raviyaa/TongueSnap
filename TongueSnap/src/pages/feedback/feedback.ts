import { SearchPractitionerPage } from './../search-practitioner/search-practitioner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  snaps: any[];
  base64Image: string;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private camera: Camera) {
  }

  ngOnInit() {
    this.firebaseService.getListOfSnaps().subscribe((value) => {
      this.snaps = value;
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FeedbackPage');
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.navCtrl.push(SearchPractitionerPage);
    }, (err) => {
      alert(err);
    });
  }
}
