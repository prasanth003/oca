import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentTrendComponent } from './current-trend/current-trend.component';
import { LibraryModule } from '../library/library.module';
import { PcChangeComponent } from './pc-change/pc-change.component';
import { PcContentComponent } from './pc-change/pc-content/pc-content.component';
import { MarketSentimentComponent } from './market-sentiment/market-sentiment.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { OpenInterestComponent } from './open-interest/open-interest.component';
import { SharedModule } from '../shared.module';

const components = [
  CurrentTrendComponent,
  PcChangeComponent,
  MarketSentimentComponent,
  OpenInterestComponent
]

@NgModule({
  declarations: [
    ...components,
    PcContentComponent
  ],
  imports: [
    CommonModule,
    LibraryModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    SharedModule
  ],
  exports: [
    ...components
  ]
})
export class WidgetModule { }
