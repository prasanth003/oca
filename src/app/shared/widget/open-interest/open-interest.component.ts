import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { iSentimentData } from '../../interface/sentimenet.interface';

interface iMinMax {
  min: number; 
  max: number; 
  current: number; 
  progress: number;
  changePercent: number;
}

const defaultValue: iMinMax = {
  min: 0,
  max: 0,
  current: 0,
  progress: 0,
  changePercent: 0
}

@Component({
  selector: 'open-interest',
  templateUrl: './open-interest.component.html',
  styleUrls: ['./open-interest.component.scss']
})
export class OpenInterestComponent implements OnChanges {

  @Input() type: 'put' | 'call' = 'put';
  @Input() sentiments: iSentimentData[] = [];
  @Input() newRecord: iSentimentData;
  
  public overallIntrest: iMinMax = defaultValue;
  public oiDiff: number = 0;
  public buyIntrest: iMinMax = defaultValue;
  public buyDiff: number = 0;
  public sellIntrest: iMinMax = defaultValue;
  public sellDiff: number = 0;

  public ngOnChanges(changes: SimpleChanges): void {

    if (changes && changes['newRecord'] && changes['newRecord'].currentValue) {
      // this.openInterest = this.type === 'call' ? this.newRecord.ceoi: this.newRecord.peoi;
      this.createSentiment(this.sentiments);
    }

    if (changes && changes['sentiments'] && changes['sentiments'].currentValue) {
      this.createSentiment(this.sentiments);
    }
  }

  private createSentiment(sentiments: iSentimentData[]): void {
    if (!sentiments || sentiments.length <= 0) return null;

    const firstSentiment: iSentimentData = sentiments[0];
    const lastSentiment: iSentimentData = sentiments[sentiments.length - 1];

    if (this.type === 'call') {
      this.overallIntrest = this.getMinMaxByKey('ceoi', sentiments);
      this.buyIntrest = this.getMinMaxByKey('ceBuy', sentiments);
      this.sellIntrest = this.getMinMaxByKey('ceSell', sentiments);

      this.oiDiff =  lastSentiment.ceoi - firstSentiment.ceoi;
      this.buyDiff = lastSentiment.ceBuy - firstSentiment.ceBuy;
      this.sellDiff = lastSentiment.ceSell - firstSentiment.ceSell;

    } else {
      this.overallIntrest = this.getMinMaxByKey('peoi', sentiments);
      this.buyIntrest = this.getMinMaxByKey('peBuy', sentiments);
      this.sellIntrest = this.getMinMaxByKey('peSell', sentiments);

      this.oiDiff =  lastSentiment.peoi - firstSentiment.peoi;
      this.buyDiff =  lastSentiment.peBuy - firstSentiment.peBuy;
      this.sellDiff =  lastSentiment.peSell - firstSentiment.peSell;
    }

  }

  private getMinMaxByKey(key: string, sentiments: iSentimentData[]): iMinMax {    
    let smallest: number = sentiments[0][key];
    let largest: number = sentiments[0][key];
    let current: number = sentiments[sentiments.length - 1][key];

    for (let i = 1; i < sentiments.length; i++) {
      const currentValue = sentiments[i][key];
      if (currentValue < smallest) {
        smallest = currentValue;
      }
      if (currentValue > largest) {
        largest = currentValue;
      }
    }

    let progress: number = ((current - smallest) / (largest - smallest)) * 100;

    let changePercent: number = (sentiments[0][key] / sentiments[sentiments.length - 1][key]) * 100;

    return { min: smallest, max: largest, current, progress, changePercent};
  }
}
