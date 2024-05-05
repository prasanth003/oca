import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../controller/data/data/data.service';
import { SentimentsService } from '../../controller/data/sentiments/sentiments.service';
import { iQuantityBreakup, iSentiment, iStrikePrice, iStrikePriceSentimentResponse } from '../../interface/strike-price.interface';
import { iSentimentData } from '../../interface/sentimenet.interface';

@Component({
  selector: 'app-trend-by-strike',
  templateUrl: './trend-by-strike.component.html',
  styleUrls: ['./trend-by-strike.component.scss', '../strike-price-table/strike-price-table.component.scss']
})
export class TrendByStrikeComponent implements AfterViewInit {

  public sentiments: iSentimentData[] = [];
  public strikePrice: iStrikePrice[] = [];
  public sentimentTrend: iSentiment[] = [];
  public newTrendData: iSentiment;

  public sentimentForGauge: iQuantityBreakup = {
    min: 0,
    max: 0,
    current: 0
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      price: number,
      date: Date,
      timeRanga: Date[],
      interval: number,
      depth: number
    },
    private sentimentService: SentimentsService
  ) { }

  public ngAfterViewInit(): void {
    if (this.data) {
      this.sentimentService.getStrikeDetails(
        this.data.date,
        this.data.interval,
        this.data.price,
        this.data.timeRanga[0],
        this.data.timeRanga[1],
        this.data.depth
      ).subscribe({
        next: (res: iStrikePriceSentimentResponse) => {

          this.strikePrice = res.strikePriceInfoResponses;
          this.sentimentForGauge = res.sentiment;

          if (this.sentimentTrend.length > 0) {
            res.marketSentiments.forEach((seniment: iSentiment) => {
              const index: number = this.sentiments.findIndex((value) => value.timestamp === seniment.timestamp);
              if (index === -1) {
                this.sentimentTrend.push(seniment);
                this.newTrendData = seniment;
              }
            })
          } else {
            this.sentimentTrend = res.marketSentiments;
          }

          this.sentimentTrend = res.marketSentiments;
        }
      });
    }
  }

  public getProgress(sentiments: iQuantityBreakup): { progress: number, changePercent: number } {    

    let current: number = sentiments.current;
    let smallest: number = sentiments.min;
    let largest: number = sentiments.max;

    let progress: number = ((current - smallest) / (largest - smallest)) * 100;
    
    if (this.checkInverse(sentiments)) {
      progress = 100 - progress;
    }

    return { progress, changePercent: 0 };
  }

  public checkInverse(breakup: iQuantityBreakup): boolean {
    if (breakup.current < 0) {
      return true;
    } 
    return false;
  }
}
