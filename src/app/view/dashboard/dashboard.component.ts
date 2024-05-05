import { Component, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Defaults } from 'src/app/shared/configuration/defaults.config';
import { SentimentsService } from 'src/app/shared/controller/data/sentiments/sentiments.service';
import { iIndices } from 'src/app/shared/interface/indices.interface';
import { iSentimentData } from 'src/app/shared/interface/sentimenet.interface';
import { iOptions, iState } from 'src/app/shared/interface/state.interface';
import { iADRatio, iQuantityBreakup, iSentiment, iStrikePrice, iStrikePriceSentimentResponse } from 'src/app/shared/interface/strike-price.interface';
import { TrendByStrikeComponent } from 'src/app/shared/widget/trend-by-strike/trend-by-strike.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  public sentiments: iSentimentData[] = [];
  public strikePrice: iStrikePrice[] = [];
  public sentimentTrend: iSentiment[] = [];
  public newTrendData: iSentiment;

  public sentimentForGauge: iQuantityBreakup = {
    min: 0,
    max: 0,
    current: 0
  }

  public newSentiment: iSentimentData;
  public availableHeight: number = 40;

  private currentDate: Date = new Date();
  private interval: number = 1;
  private timeRange: Date[] = [];
  private index: string = Defaults.Index;

  public runningInterval: any;
  public depth: number = 7;

  public sidebarOpened: boolean = true;
  public sidebarMode: MatDrawerMode = 'side';
  public sidebarWidth: number = 350;

  public strikePriceResponse: iStrikePriceSentimentResponse;

  public adRatio: iADRatio;

  constructor(
    private sentimentData: SentimentsService,
    private cdRef: ChangeDetectorRef,
    private store: Store<iState>,
    private dialog: MatDialog
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

    if (window.innerWidth < 1200) {
      this.sidebarOpened = false;
    }

    if (window.innerWidth < 500) {
      this.sidebarWidth = window.innerWidth;
    } else {
      this.sidebarWidth = 350;
    }
  }

  public ngAfterViewInit(): void {
    this.onResize();
    this.getData();
    this.cdRef.detectChanges();
  }

  private getData(): void {
    this.getSentiments(this.currentDate, this.interval, this.depth, this.index);
    this.getStrikePriceDetails(this.currentDate, this.interval, this.depth, this.index);
    this.runningInterval = setInterval(() => {
      this.getSentiments(this.currentDate, this.interval, this.depth, this.index);
      this.getStrikePriceDetails(this.currentDate, this.interval, this.depth, this.index);
    }, 15000);
  }

  private getSentiments(date: Date = new Date(), interval: number = 1, depth: number = this.depth, index: string = Defaults.Index): void {
    this.sentimentData.getSentiments(date, interval, this.timeRange[0], this.timeRange[1], depth, index).subscribe({
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

  public closeSideBar(): void {
    this.sidebarOpened = this.sidebarOpened ? false: true;
  }

  public onDepthChange(event: number): void {
    this.depth = event;
    this.getSentiments(this.currentDate, this.interval);
    this.getStrikePriceDetails(this.currentDate, this.interval);
  }

  private getStrikePriceDetails(date: Date = new Date(), interval: number = 1, depth: number = this.depth, index: string = Defaults.Index): void {
    this.sentimentData.getStrikeDetails(date, interval, 0, this.timeRange[0], this.timeRange[1], depth, index).subscribe({
      next: (res: iStrikePriceSentimentResponse) => {

        if (res && res.advance && res.decline && res.unchanged) {
          this.adRatio = {
            decline: parseInt(res.decline),
            advance: parseInt(res.advance),
            unchanged: parseInt(res.unchanged)
          }
        }

        this.strikePriceResponse = res;

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
    })
  }

  public openStrikePriceDetails(price: number): void {
    this.dialog.open(TrendByStrikeComponent, {
      data: {
        price: price,
        date: this.currentDate,
        timeRanga: this.timeRange,
        interval: this.interval,
        depth: this.depth
      },
      width: '85%'
    })
  }
}
