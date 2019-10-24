// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { FavoritePhotosComponent} from './favorite-photos.component';
import {CommonModule} from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule

  ],
  declarations: [
    FavoritePhotosComponent,
  ],
  exports: [
    FavoritePhotosComponent,
  ],
})
export class FavoritePhotosModule {

}
