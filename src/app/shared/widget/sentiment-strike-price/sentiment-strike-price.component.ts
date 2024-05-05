import { Component, Input } from '@angular/core';
import { iStrikePriceBuySellResponse, iStrikeQuantity } from '../../interface/strike-price-buy-sell.interface';

@Component({
  selector: 'sentiment-strike-price',
  templateUrl: './sentiment-strike-price.component.html',
  styleUrls: ['./sentiment-strike-price.component.scss', '../strike-price-table/strike-price-table.component.scss']
})
export class SentimentStrikePriceComponent {

  @Input() prices: iStrikePriceBuySellResponse[] = [];

  public getProgress(sentiments: iStrikeQuantity, type: string, extension: string = 'value'): { progress: number, changePercent: number } {    

    let current: number = sentiments.current[type][extension];
    let smallest: number = sentiments.min[type][extension];
    let largest: number = sentiments.max[type][extension];

    let progress: number = ((current - smallest) / (largest - smallest)) * 100;
    
    if (this.checkInverse(sentiments, type, extension)) {
      progress = 100 - progress;
    }

    return { progress, changePercent: 0 };
  }
  public getProgressPercentage(current: number, smallest: number, largest: number): { progress: number, changePercent: number } {

    let progress: number = ((current - smallest) / (largest - smallest)) * 100;

    return { progress, changePercent: 0 };
  }
  public checkInverse(breakup: iStrikeQuantity, type: string, extension: string = 'value'): boolean {

    // if (extension !== 'value') {
    //   if (breakup.max[type][extension] - breakup.min[type][extension] <= 0) return true;
    //   return false;
    // }

    if (breakup.current[type][extension] < 0) {
      return true;
    } 

    return false;
  }

  public timeToTz(originalTime: string): string {
    return originalTime.split('T')[1];
  }
}
