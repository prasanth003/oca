import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { LibraryModule } from 'src/app/shared/library/library.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SummaryCardComponent } from './summary-card/summary-card.component';


@NgModule({
  declarations: [
    SummaryComponent,
    SummaryCardComponent
  ],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    WidgetModule,
    SharedModule,
    LibraryModule
  ]
})
export class SummaryModule { }
