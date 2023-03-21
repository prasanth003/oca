import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { CrudService } from 'src/app/shared/controller/common/crud/crud.service';
import { SentimentsService } from 'src/app/shared/controller/data/sentiments/sentiments.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { LibraryModule } from 'src/app/shared/library/library.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    WidgetModule,
    SharedModule,
    LibraryModule
  ],
  providers: [
    CrudService,
    SentimentsService,
    
  ]
})
export class DashboardModule { }
