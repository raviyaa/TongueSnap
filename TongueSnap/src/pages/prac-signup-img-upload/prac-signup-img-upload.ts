import { storage } from 'firebase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';



@IonicPage()
@Component({
  selector: 'page-prac-signup-img-upload',
  templateUrl: 'prac-signup-img-upload.html',
})
export class PracSignupImgUploadPage {

  base64Image: string;
  image: string;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private camera: Camera,
    private firebaseService: FirebaseService) {
  }

  capture() {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (error) => {
      let toast = this.toastCtrl.create({
        message: error,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  upload() {
    let storageRef = storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    const imageRef = storageRef.child(`avatars/${filename}.jpg`);
    this.firebaseService.uploadImage(this.base64Image, imageRef).then((res) => {
      if (res) {
        this.firebaseService.getImageUrl(imageRef).then((url) => {
          console.log(url);
        }, (error) => {
          let toast = this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });
      }
    }, error => {
      let toast = this.toastCtrl.create({
        message: error,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });

  }

  /*   upload() {
      let storageRef = storage().ref();
      const filename = Math.floor(Date.now() / 1000);
      const imageRef = storageRef.child(`avatars/${filename}.jpg`);
      imageRef.putString(this.base64Image, storage.StringFormat.DATA_URL).then((snapshot) => {
        console.log(snapshot);
        console.log('successful');
        imageRef.getDownloadURL().then((url => {
          this.image = url
          console.log(url);
        }));
      }, (err) => {
      });
  
    } */
  ionViewDidLoad() {
  }

}
