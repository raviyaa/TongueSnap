import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateSnapPage } from './create-snap';

@NgModule({
  declarations: [
    CreateSnapPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateSnapPage),
  ],
})
export class CreateSnapPageModule {}
