import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { TranslateService } from '@ngx-translate/core';
import { PracSignupImgUploadPage } from '../prac-signup-img-upload/prac-signup-img-upload';

@IonicPage()
@Component({
  selector: 'page-prac-signup',
  templateUrl: 'prac-signup.html',
})
export class PracSignupPage {
  user: User;
  signUpForm: FormGroup;
  private signupErrorString: string;

  constructor(private navCtrl: NavController,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private firebaseService: FirebaseService,
    private translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }
  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['',],
      title: ['',],
      speciality: ['',],
      bio: ['',],
      password: ['',],
      repassword: ['',]

    });


  }

  doSignup() {
    this.navCtrl.push(PracSignupImgUploadPage);
/*     const p = Object.assign({}, this.user, this.signUpForm.value);
    console.log(p);
    this.firebaseService.createUserAuth(p).then((user) => {
      console.log(user);
      if (user != null) {
        console.log(true);
        this.firebaseService.createUser(p).then((user) => {
         //navigate to image upload page
        });
      }
    }, error => {
      let toast = this.toastCtrl.create({
        message: error,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }); */

  }
}
