import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InquirePage } from './inquire';

@NgModule({
  declarations: [
    InquirePage,
  ],
  imports: [
    IonicPageModule.forChild(InquirePage),
  ],
})
export class InquirePageModule {}
