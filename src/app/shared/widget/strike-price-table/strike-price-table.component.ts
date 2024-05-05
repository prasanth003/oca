import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { iQuantityBreakup, iSentiment, iStrikePrice } from '../../interface/strike-price.interface';

@Component({
  selector: 'strike-price-table',
  templateUrl: './strike-price-table.component.html',
  styleUrls: ['./strike-price-table.component.scss']
})
export class StrikePriceTableComponent implements OnInit, OnChanges {
  
  @Input() prices: iStrikePrice[] = [];
  @Input() height: number = 400;
  @Output() showStrikeDetails: EventEmitter<number> = new EventEmitter<number>();

  public displayPercentage: boolean = true;
  
   /* Listing on window resize */
   @HostListener('window:resize', ['$event'])
   public onResize() {
    if (window.innerWidth < 720) {
      this.displayPercentage = false;
    } else {
      this.displayPercentage = true
    }
  }

  public ngOnInit(): void {
    this.onResize();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['prices'] && changes['prices'].currentValue && this.prices.length > 0) {
      let currentPrice: iStrikePrice[] = this.prices.filter((value: iStrikePrice) => value.isCurrentPrice);
        const currentElement: HTMLElement = document.getElementById('i' + currentPrice[0].strikePrice);
        
        if (currentElement) {
          currentElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
        }
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
  public getProgressPercentage(current: number, smallest: number, largest: number): { progress: number, changePercent: number } {
  
    let progress: number = ((current - smallest) / (largest - smallest)) * 100;

    return { progress, changePercent: 0 };
  }

  public checkInverse(breakup: iQuantityBreakup): boolean {
    if (breakup.current < 0) {
      return true;
    } 
    return false;
  }

  public openDetails(price: number): void {
    this.showStrikeDetails.emit(price);
  }
}
