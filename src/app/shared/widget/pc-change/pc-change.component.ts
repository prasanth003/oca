import { AfterViewInit, Component, HostListener, Input } from '@angular/core';
import { iSentimentData } from '../../interface/sentimenet.interface';

@Component({
  selector: 'pc-change',
  templateUrl: './pc-change.component.html',
  styleUrls: ['./pc-change.component.scss']
})
export class PcChangeComponent implements AfterViewInit {

  @Input() sentiments: iSentimentData[] = [];
  @Input() newRecord: iSentimentData;

  public availableHeight: number;
  
  /* Listing on window resize */
  @HostListener('window:resize', ['$event'])
  public onResize() {
    const navbarHeight: number = 40;
    const spacing: number = 100;
    const availableHeight: number = window.innerHeight - (navbarHeight + spacing);
    this.availableHeight = availableHeight;
  }

  public ngAfterViewInit(): void {
    this.onResize();
    // this.sentiments = [
    //   {
    //     ceoiChange: 231212,
    //     peoiChange: 239819,
    //     sentiment: 128121,
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     ceoiChange: 231212,
    //     peoiChange: 239819,
    //     sentiment: 128121,
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     ceoiChange: 231212,
    //     peoiChange: 239819,
    //     sentiment: 128121,
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     ceoiChange: 231212,
    //     peoiChange: 239819,
    //     sentiment: 128121,
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     ceoiChange: 231212,
    //     peoiChange: 239819,
    //     sentiment: 128121,
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     ceoiChange: 231212,
    //     peoiChange: 239819,
    //     sentiment: 128121,
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     ceoiChange: 231212,
    //     peoiChange: 239819,
    //     sentiment: 128121,
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     ceoiChange: 231212,
    //     peoiChange: 239819,
    //     sentiment: 128121,
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     ceoiChange: 231212,
    //     peoiChange: 239819,
    //     sentiment: 128121,
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     ceoiChange: 231212,
    //     peoiChange: 239819,
    //     sentiment: 128121,
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     ceoiChange: 231212,
    //     peoiChange: 239819,
    //     sentiment: 128121,
    //     timestamp: new Date().getTime()
    //   }
    // ]
  }

  public findWinning(sentiment: iSentimentData): string {
    
    let changeRatio: number = sentiment.peoiChange - sentiment.ceoiChange;

    if (changeRatio >= 10000) {
      return 'bg-light-green-2';
    } else if (changeRatio <= -10000) {
      return 'bg-light-red-2';
    }  else {
      return '';
    }
  }
}
