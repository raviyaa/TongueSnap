import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PracDashboardPage } from './prac-dashboard';

@NgModule({
  declarations: [
    PracDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(PracDashboardPage),
  ],
})
export class PracDashboardPageModule {}
