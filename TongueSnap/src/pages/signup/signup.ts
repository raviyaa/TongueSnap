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
    this.firebaseService.createUserAuth(p).then((user) => {
      console.log(user);
      if (user != null) {
        console.log(true);
        this.firebaseService.createUser(p).then((user) => {
          console.log('navigate to camera');
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
}
