import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PractitionerProfilePage } from './practitioner-profile';

@NgModule({
  declarations: [
    PractitionerProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(PractitionerProfilePage),
  ],
})
export class PractitionerProfilePageModule {}
