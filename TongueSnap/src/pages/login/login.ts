import { DashboardPage } from './../dashboard/dashboard';
import { PractitionerProfilePage } from './../practitioner-profile/practitioner-profile';
import { TypeSelectionPage } from './../type-selection/type-selection';
import { User } from './../../models/user';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { DataService } from '../../providers/dataservice/dataservice';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: User;
  loginForm: FormGroup;
  list:any[];
  private loginErrorString: string;
  
  constructor(public navCtrl: NavController,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    public firebaseService: FirebaseService,
    public translateService: TranslateService,
    public dataService: DataService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
  }
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['',],
      password: ['',],

    });

    this.firebaseService.getListOfUsers().subscribe((value) => {
      this.list = value;
    })

  }
  // Attempt to login in through our User service
  doLogin() {
    
    this.dataService.setSelectedUser(this.list[1]);

    console.log(this.loginForm.value);
    const p = Object.assign({}, this.user, this.loginForm.value);

    console.log(p);
    this.firebaseService.userLogin(p).then((user) => {
      console.log(user);
      if (user != null) {
        //this.navCtrl.push(PractitionerProfilePage);
        this.navCtrl.push(DashboardPage);
      }
    }, error => {
      this.createToast(error);
    });
   
   
  }

  signUp() {
    this.navCtrl.push(TypeSelectionPage);
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
