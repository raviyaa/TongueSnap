import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  user: User;
  signUpForm: FormGroup;
  // Our translated text strings
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
      email: ['',],
      location: ['',],
      password: ['',],
      repassword: ['',]

    });

   
  }
  doSignup() {
    const p = Object.assign({}, this.user, this.signUpForm.value);
    console.log(p);
    console.log(this.firebaseService.createUser(p));
   /*  // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });*/
  } 
}
