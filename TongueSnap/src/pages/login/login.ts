import { DashboardPage } from './../dashboard/dashboard';
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
import * as _ from 'underscore';
import { APP_DI_CONFIG } from '../../app/app-config/app-config.constants';
import { PracDashboardPage } from '../prac-dashboard/prac-dashboard';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: User;
  loginForm: FormGroup;
  list: any[];
  currentUser: any;
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
  }
  // Attempt to login in through our User service
  doLogin() {
    const p = Object.assign({}, this.user, this.loginForm.value);
    this.firebaseService.userLogin(p).then((user) => {
      if (!_.isEmpty(user)) {
        this.firebaseService.findUserByEmail(p.email).subscribe((res) => {
          this.currentUser = res[0];
          this.dataService.setSelectedUser(this.currentUser);
          console.log(this.currentUser);
          if (this.currentUser.type == APP_DI_CONFIG.TYPE_CLIENT) {
            this.navCtrl.push(DashboardPage);
          } else if (this.currentUser.type == APP_DI_CONFIG.TYPE_PRACTITIONER) {
            this.navCtrl.push(PracDashboardPage);
          } else {
            this.createToast("Something went wrong!");
          }
        });

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
  ngOnDestroy(): void {
    this.loginForm.reset();
  }
}
