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
    TypeSelectionPage
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
    TypeSelectionPage
  ],
  providers: [
    FirebaseService,
    Camera,
    SplashScreen,
    StatusBar,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
