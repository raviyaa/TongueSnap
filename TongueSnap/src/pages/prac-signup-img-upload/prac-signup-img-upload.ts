import { PractitionerProfilePage } from './../practitioner-profile/practitioner-profile';
import { User } from './../../models/user';
import { storage } from 'firebase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { DataService } from '../../providers/dataservice/dataservice';
import * as _ from 'underscore';

@IonicPage()
@Component({
  selector: 'page-prac-signup-img-upload',
  templateUrl: 'prac-signup-img-upload.html',
})
export class PracSignupImgUploadPage {

  base64Image: string;
  image: string;
  user: User;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private camera: Camera,
    private firebaseService: FirebaseService,
    private alertCtrl: AlertController,
    private dataService: DataService) {
  }
  ngOnInit() {
    this.user = this.dataService.getSelectedUser();
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
      this.createToast(error);
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
          this.user.avatarUrl = url;

          this.firebaseService.createUserAuth(this.user).then((user) => {
            console.log(user);
            if (!_.isEmpty(user)) {
              if (!_.isEmpty(this.user)) {
                this.firebaseService.createUser(this.user).then((user) => {
                  console.log('navigate to user profile');
                  console.log(user.key);
                  this.createToast("Regristration Success!");
                  this.navCtrl.push(PractitionerProfilePage);
                });
              }else{
                this.createToast("Something went wrong");
              }
            }
          }, error => {
            this.createToast(error);
          });
          //this.showSuccesfulUploadAlert();
        }, (error) => {
          this.createToast(error);
        });
      }
    }, error => {
      this.createToast(error);
    });

  }
  showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();
    this.base64Image = "";
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

  createToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
