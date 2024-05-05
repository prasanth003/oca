import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SentimentRoutingModule } from './sentiment-routing.module';
import { SentimentComponent } from './sentiment.component';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LibraryModule } from 'src/app/shared/library/library.module';


@NgModule({
  declarations: [
    SentimentComponent
  ],
  imports: [
    CommonModule,
    SentimentRoutingModule,
    WidgetModule,
    SharedModule,
    LibraryModule
  ]
})
export class SentimentModule { }
