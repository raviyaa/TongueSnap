import { TypeSelectionPage } from './../type-selection/type-selection';
import { User } from './../../models/user';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: User;
  loginForm: FormGroup;
  private loginErrorString: string;
  
  constructor(public navCtrl: NavController,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    public firebaseService: FirebaseService,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
  }
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['',],
      password: ['',],

    });

  /*   this.firebaseService.getListOfUsers().subscribe(res => {
      console.log(res);
    }); */
  }
  // Attempt to login in through our User service
  doLogin() {
    console.log(this.loginForm.value);
    const p = Object.assign({}, this.user, this.loginForm.value);

    console.log(p);
    this.firebaseService.userLogin(p).then((user) => {
      console.log(user);
      if (user != null) {
        console.log(true);
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

  signUp() {
    this.navCtrl.push(TypeSelectionPage);
  }
}
