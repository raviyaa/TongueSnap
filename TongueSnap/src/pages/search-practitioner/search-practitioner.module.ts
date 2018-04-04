import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPractitionerPage } from './search-practitioner';

@NgModule({
  declarations: [
    SearchPractitionerPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPractitionerPage),
  ],
})
export class SearchPractitionerPageModule {}
