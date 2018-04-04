import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PracSignupPage } from './prac-signup';

@NgModule({
  declarations: [
    PracSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(PracSignupPage),
  ],
})
export class PracSignupPageModule {}
