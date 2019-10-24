import { NgModule } from '@angular/core';
import { ImageComponent } from './image.component';
import {CommonModule} from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule

  ],
  declarations: [
    ImageComponent,
  ],
  exports: [
    ImageComponent,
  ]
})
export class ImageModule {}
