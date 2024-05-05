import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Defaults } from 'src/app/shared/configuration/defaults.config';
import { SentimentsService } from 'src/app/shared/controller/data/sentiments/sentiments.service';
import { iSentimentData } from 'src/app/shared/interface/sentimenet.interface';
import { iState, iOptions } from 'src/app/shared/interface/state.interface';
import { iQuantityBreakup, iSentiment } from 'src/app/shared/interface/strike-price.interface';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent {

  public sentiments: iSentimentData[] = [];
  public newSentiment: iSentimentData;
  public availableHeight: number = 40;

  private currentDate: Date = new Date();
  private interval: number = 1;
  private timeRange: Date[] = [];

  public sentimentTrend: iSentiment[] = [];
  public newTrendData: iSentiment;

  public sentimentForGauge: iQuantityBreakup = {
    min: 0,
    max: 0,
    current: 0
  }

  public runningInterval: any;

  private index: string = Defaults.Index;

  constructor(
    private sentimentData: SentimentsService,
    private cdRef: ChangeDetectorRef,
    private store: Store<iState>
  ) { 
    this.store.select(state => state.option).subscribe({
      next: (option: iOptions) => {
        this.currentDate = option.currentDate;
        this.interval = option.interval;
        this.timeRange = option.range;
        this.sentiments = [];
        this.index = option.index;

        clearInterval(this.runningInterval);
        this.getData();
      }
    })
  }

  /* Listing on window resize */
  @HostListener('window:resize', ['$event'])
  public onResize() {
    const navbarHeight: number = 64;
    const spacing: number = 0;
    const availableHeight: number = window.innerHeight - (navbarHeight + spacing);
    this.availableHeight = availableHeight;
  }

  public ngAfterViewInit(): void {
    this.onResize();
    this.getData();
    this.cdRef.detectChanges();
  }

  private getData(): void { 
    this.getSentiments(this.currentDate, this.interval, 7, this.index);    
    this.runningInterval = setInterval(() => {
      this.getSentiments(this.currentDate, this.interval, 7, this.index);
    }, 15000);
  }

  private getSentiments(date: Date = new Date(), interval: number = 1, depth: number = 7, index: string = Defaults.Index): void {

    this.sentimentData.getSentiments(date, interval, this.timeRange[0], this.timeRange[1], depth, index).subscribe({
      next: (res: iSentimentData[]) => {
        if (this.sentiments.length > 0) {
          res.forEach((seniment: iSentimentData) => {
            const index: number = this.sentiments.findIndex((value) => value.timestamp === seniment.timestamp);
            if (index === -1) {
              
              let trend: iSentiment = {
                createdAt: '',
                current: seniment.sentiment,
                timestamp: seniment.timestamp
              };

              this.sentiments.push(seniment);
              this.newSentiment = seniment;

              this.sentimentTrend.push(trend);
              this.newTrendData = trend;
              this.sentimentForGauge = this.getMinMaxByKey('sentiment', this.sentiments);

            }
          })
        } else {
          this.sentiments = res;
          this.sentimentTrend = res.map((value: iSentimentData) => { return <iSentiment> { 
            createdAt: '',
            current: value.sentiment,
            timestamp: value.timestamp
           } 
          });
          this.sentimentForGauge = this.getMinMaxByKey('sentiment', this.sentiments);
        }
      }
    });
  }
  

  private getMinMaxByKey(key: string, sentiments: iSentimentData[]): iQuantityBreakup {    
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
    
    return { min: smallest, max: largest, current };
  }
}
