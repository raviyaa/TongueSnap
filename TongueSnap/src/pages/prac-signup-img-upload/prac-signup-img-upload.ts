import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-prac-signup-img-upload',
  templateUrl: 'prac-signup-img-upload.html',
})
export class PracSignupImgUploadPage {

  base64Image: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private camera: Camera) {
  }

  ionViewDidLoad() {

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
    }, (err) => {
      alert(err);
    });
  }
}
