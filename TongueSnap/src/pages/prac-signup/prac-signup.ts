import { DataService } from './../../providers/dataservice/dataservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { TranslateService } from '@ngx-translate/core';
import { PracSignupImgUploadPage } from '../prac-signup-img-upload/prac-signup-img-upload';
import { APP_DI_CONFIG } from '../../app/app-config/app-config.constants';

@IonicPage()
@Component({
  selector: 'page-prac-signup',
  templateUrl: 'prac-signup.html',
})
export class PracSignupPage {
  user: User;
  signUpForm: FormGroup;
  logoUrl: string = APP_DI_CONFIG.LOGO2_URL;
  private signupErrorString: string;

  constructor(private navCtrl: NavController,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private dataService: DataService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }
  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      speciality: ['', Validators.required],
      bio: ['', Validators.required],
      email: ['', Validators.required],
      location: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    });
  }

  doSignup() {
    if (this.signUpForm.dirty && this.signUpForm.valid) {
      if (this.signUpForm.value.password.length < 6) {
        this.createToast("Password min 6 characters");
      }
      else if (this.signUpForm.value.password !== this.signUpForm.value.repassword) {
        this.createToast("Password doesn't match!");
      } else {
        const p = Object.assign({}, this.user, this.signUpForm.value);
        p.type = "practitioner";
        console.log(p);
        this.dataService.setSelectedUser(p);
        this.navCtrl.push(PracSignupImgUploadPage);
      }
    } else {
      this.createToast("Please provide all the details!");
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
