import { Component, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { SentimentsService } from 'src/app/shared/controller/data/sentiments/sentiments.service';
import { iSentimentData } from 'src/app/shared/interface/sentimenet.interface';
import { iOptions, iState } from 'src/app/shared/interface/state.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  public sentiments: iSentimentData[] = [];
  public newSentiment: iSentimentData;
  public availableHeight: number = 40;

  private currentDate: Date = new Date();
  private interval: number = 1;
  private timeRange: Date[] = [];

  public runningInterval: any;

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
        this.getSentiments(this.currentDate, this.interval);
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
    this.getSentiments();    
     this.runningInterval = setInterval(() => {
       this.getSentiments(this.currentDate, this.interval);
     }, 15000);

    this.cdRef.detectChanges();
  }

  private getSentiments(date: Date = new Date(), interval: number = 1): void {

    this.sentimentData.getSentiments(date, interval, this.timeRange[0], this.timeRange[1]).subscribe({
      next: (res: iSentimentData[]) => {
        if (this.sentiments.length > 0) {
          res.forEach((seniment: iSentimentData) => {
            const index: number = this.sentiments.findIndex((value) => value.timestamp === seniment.timestamp);
            if (index === -1) {
              this.sentiments.push(seniment);
              this.newSentiment = seniment;
            }
          })
        } else {
          this.sentiments = res;
        }
      }
    });

    // if (!this.dataService.useInterval(this.currentDate)) {
    //   clearInterval(this.runningInterval);
    //   return null;
    // }
  }
}
