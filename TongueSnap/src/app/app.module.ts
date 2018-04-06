import { DataService } from './../providers/dataservice/dataservice';
import { LoginPage } from './../pages/login/login';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SignupPage } from '../pages/signup/signup';
import { FirebaseService } from '../providers/firebase-service/firebase-service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { TypeSelectionPage } from '../pages/type-selection/type-selection';
import { PractitionerProfilePage } from '../pages/practitioner-profile/practitioner-profile';
import { CallNumber } from '@ionic-native/call-number';
import { PracSignupPage } from '../pages/prac-signup/prac-signup';
import { PracSignupImgUploadPage } from '../pages/prac-signup-img-upload/prac-signup-img-upload';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ConversationPage } from '../pages/conversation/conversation';
import { FavouritePage } from '../pages/favourite/favourite';
import { FeedbackPage } from '../pages/feedback/feedback';
import { SearchPractitionerPage } from '../pages/search-practitioner/search-practitioner';
import { APP_CONFIG, APP_DI_CONFIG } from './app-config/app-config.constants';
import { PracDashboardPage } from '../pages/prac-dashboard/prac-dashboard';
import { CreateSnapPage } from '../pages/create-snap/create-snap';
import { InquirePage } from '../pages/inquire/inquire';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {

}

const firebaseConfig = {
  apiKey: "AIzaSyBfFZmP-xkKkA8qkL77tEAakrP5sFflvto",
  authDomain: "tonguesnap-46926.firebaseapp.com",
  databaseURL: "https://tonguesnap-46926.firebaseio.com",
  projectId: "tonguesnap-46926",
  storageBucket: "tonguesnap-46926.appspot.com",
  messagingSenderId: "66411552123"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    TypeSelectionPage,
    PractitionerProfilePage,
    PracSignupPage,
    PracSignupImgUploadPage,
    DashboardPage,
    ConversationPage,
    FavouritePage,
    FeedbackPage,
    SearchPractitionerPage,
    PracDashboardPage,
    CreateSnapPage,
    InquirePage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    TypeSelectionPage,
    PractitionerProfilePage,
    PracSignupPage,
    PracSignupImgUploadPage,
    DashboardPage,
    ConversationPage,
    FavouritePage,
    FeedbackPage,
    SearchPractitionerPage,
    PracDashboardPage,
    CreateSnapPage,
    InquirePage
  ],
  providers: [
    FirebaseService,
    CallNumber,
    DataService,
    Camera,
    SplashScreen,
    StatusBar,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: APP_CONFIG,
      useValue: APP_DI_CONFIG
    },
  ]
})
export class AppModule { }
