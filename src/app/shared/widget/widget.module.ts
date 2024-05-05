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
import { SentimentStrikePriceComponent } from './sentiment-strike-price/sentiment-strike-price.component';
import { StrikePriceTableComponent } from './strike-price-table/strike-price-table.component';
import { TrendByStrikeComponent } from './trend-by-strike/trend-by-strike.component';
import { BankRatioComponent } from './bank-ratio/bank-ratio.component';

const components = [
  CurrentTrendComponent,
  PcChangeComponent,
  MarketSentimentComponent,
  OpenInterestComponent,
  SentimentStrikePriceComponent,
  StrikePriceTableComponent,
  TrendByStrikeComponent,
  BankRatioComponent
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
