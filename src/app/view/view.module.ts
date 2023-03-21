import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { LibraryModule } from '../shared/library/library.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    LibraryModule,
    SharedModule
  ]
})
export class ViewModule { }
