// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import {ImageModule} from '../image/image.module';

// This Module's Components
import { GalleryComponent } from './gallery.component';
@NgModule({
    imports: [
        CommonModule,
        ImageModule,
    ],
    declarations: [
        GalleryComponent,
    ],
    exports: [
        GalleryComponent,
    ],
})
export class GalleryModule {

}
