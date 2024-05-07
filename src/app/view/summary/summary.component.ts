import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, lastValueFrom, map } from 'rxjs';
import { Defaults } from 'src/app/shared/configuration/defaults.config';
import { SentimentsService } from 'src/app/shared/controller/data/sentiments/sentiments.service';
import { iOptions, iState } from 'src/app/shared/interface/state.interface';
import { iSummary, iSummaryByStrikePrice } from 'src/app/shared/interface/summary.interface';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  private currentDate: Date = new Date();
  private interval: number = 1;
  private timeRange: Date[] = [];
  private index: string = Defaults.Index;

  public runningInterval: any;
  public depth: number = 5;

  public summary: iSummaryByStrikePrice;

  constructor(
    private sentimentData: SentimentsService,
    private store: Store<iState>
  ) {
    this.store.select(state => state.option).subscribe({
      next: (option: iOptions) => {
        this.currentDate = option.currentDate;
        this.interval = option.interval;
        this.timeRange = option.range;
        this.index = option.index;

        clearInterval(this.runningInterval);

        this.getSummary(this.currentDate, this.interval, this.depth, this.index);

        this.runningInterval = setInterval(() => {
          this.getSummary(this.currentDate, this.interval, this.depth, this.index);
        }, 1500000000);

      }
    })
  }

  private async getSummary(date: Date = new Date(), interval: number = 1, depth: number = this.depth, index: string = Defaults.Index): Promise<void> {
    this.summary = await lastValueFrom(this.sentimentData.getSummary(date, interval, 0, this.timeRange[0], this.timeRange[1], depth, index).pipe(
      map(data => {
        const callOptions = data.callOptions.reduce((acc, curr) => {
          acc[curr.strikePrice] = curr;
          return acc;
        }, {});

        const putOptions = data.putOptions.reduce((acc, curr) => {
          acc[curr.strikePrice] = curr;
          return acc;
        }, {});

        const strikePrices = Object.keys(callOptions).map(Number);

        const strikePriceData = strikePrices.map(price => ({
          price,
          callOption: callOptions[price],
          putOption: putOptions[price]
        }));

        return {
          close: data.close,
          createdAt: data.createdAt,
          indexName: data.indexName,
          strikePrice: strikePriceData,
          atmStrikePrice: data.atmStrikePrice
        };
      })
    ));
  }

}

