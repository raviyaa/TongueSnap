import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
    private toastCtrl: ToastController,
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
     
      let toast = this.toastCtrl.create({
        message: this.base64Image,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }, (err) => {
      alert(err);
    });
  }
}
