import { DashboardPage } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from 'angularfire2/database';
import * as _ from 'underscore';
import { APP_DI_CONFIG } from '../../app/app-config/app-config.constants';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  user: User;
  signUpForm: FormGroup;
  logoUrl: string = APP_DI_CONFIG.LOGO_URL;
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
      name: ['', Validators.required],
      email: ['', Validators.required],
      location: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    });


  }

  doSignup() {
    if (this.signUpForm.dirty && this.signUpForm.valid) {
      if (this.signUpForm.value.password.length<6) {
        this.createToast("Password min 6 characters");
      }
      else if (this.signUpForm.value.password !== this.signUpForm.value.repassword) {
        this.createToast("Password doesn't match!");
      } else {
        const p = Object.assign({}, this.user, this.signUpForm.value);
        p.type = "client";
        console.log(p);
        this.firebaseService.createUserAuth(p).then((user) => {
          console.log(user);
          if (!_.isEmpty(user)) {
            this.firebaseService.createUser(p).then((user) => {
              console.log('navigate to dashboard');
              console.log(user.key);
              this.createToast("Regesitration successful!");
              this.navCtrl.push(DashboardPage);
            });
          }
        }, error => {
          this.createToast(error);
        });
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
