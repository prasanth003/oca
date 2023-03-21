import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    NgxSliderModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    MaterialModule,
    NgxSliderModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LibraryModule { }
