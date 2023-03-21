import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { SentimentsService } from 'src/app/shared/controller/data/sentiments/sentiments.service';
import { getMarketTime } from 'src/app/shared/helpers/date.helper';
import { iSentimentData } from 'src/app/shared/interface/sentimenet.interface';

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

  constructor(
    private sentimentData: SentimentsService,
    private cdRef: ChangeDetectorRef,
  ) { }

  /* Listing on window resize */
  @HostListener('window:resize', ['$event'])
  public onResize() {
    const navbarHeight: number = 0;
    const spacing: number = 0;
    const availableHeight: number = window.innerHeight - (navbarHeight + spacing);
    this.availableHeight = availableHeight;
  }

  public ngAfterViewInit(): void {
    this.onResize();
    this.getSentiments();
    setInterval(() => {
      this.getSentiments();
    }, 20000);
    this.cdRef.detectChanges();
  }

  private getSentiments(date: Date = new Date()): void {
    this.sentimentData.getSentiments(date).subscribe({
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
  }

  public onDateChange(date: Date): void {
    this.currentDate = date;
    this.sentiments = [];
    this.getSentiments(this.currentDate);
  }

  public onTimeChange(event: Date[]): void {
    console.log('event', event);
  }

  public onIntervalChange(interval: number): void {
    console.log('interval', interval);
  }
}
