import { Component, AfterViewInit, ChangeDetectorRef, ElementRef, HostListener, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { Defaults } from '../../configuration/defaults.config';
import { iState, iTheme } from '../../interface/state.interface';
import { iSentiment } from '../../interface/strike-price.interface';
import { iSentimentData } from '../../interface/sentimenet.interface';



@Component({
  selector: 'bear-and-bull',
  templateUrl: './bear-bull-chart.component.html',
  styleUrls: ['./bear-bull-chart.component.scss']
})
export class BearBullChartComponent implements AfterViewInit {

  public chart: IChartApi;
  private chartHeight: number = 450;
  
  private buyData: { value: number, time: number }[] = [];
  private sellData: { value: number, time: number }[] = [];

  public buySeries: ISeriesApi<'Line'>;
  public sellSeries: ISeriesApi<'Line'>;

  @ViewChild('currentTrendBS') trendElement: ElementRef;

  @Input() height: number;

  @Input() sentiment: iSentimentData[] = [];
  @Input() newRecord: iSentimentData;

  constructor(
    private cdRef: ChangeDetectorRef,
    private store: Store<iState>
  ) {
    
    this.store.select(state => state.theme).subscribe({
      next: (theme: iTheme) => {
        if (this.chart) {
          this.chart.applyOptions({
            layout: {
              background: {
                color: theme.name === 'light' ? '#fff': '#000'
              },
              textColor: theme.name === 'light' ? '#1e1e1e': '#fafafa'
            }
          })
        }
      }
    });
  }

  /* Listing on window resize */
  @HostListener('window:resize', ['$event'])
  public onResize() {
    if (!this.chart || !this.trendElement || !this.trendElement.nativeElement) return null;
    const element: HTMLElement = this.trendElement.nativeElement;

    if (element.offsetWidth < 400) {
      this.chart.applyOptions({
        rightPriceScale: {
          visible: false
        }
      });
    } else {
      this.chart.applyOptions({
        rightPriceScale: {
          visible: true
        }
      });
    }

    this.chart.resize(element.offsetWidth, this.chartHeight, true);
  }

  public ngOnChanges(changes: SimpleChanges): void { 
    
    if (changes && changes['sentiment'] && changes['sentiment'].currentValue) {      
      this.buyData = this.sentiment.map((value) => { return { value: value.peoi, time: this.timeToTz(value.timestamp) } });
      this.sellData = this.sentiment.map((value) => { return { value: value.ceoi, time: this.timeToTz(value.timestamp) } });

      this.buySeries?.setData(this.buyData as any);
      this.sellSeries?.setData(this.sellData as any);
    }

    if (changes && changes['newRecord'] && changes['newRecord'].currentValue) {
      
      const put: any = {
        value: this.newRecord.peoi,
        time: this.timeToTz(this.newRecord.timestamp)
      }

      const call: any = {
        value: this.newRecord.ceoi,
        time: this.timeToTz(this.newRecord.timestamp)
      }

      this.buyData.push(put);
      this.sellData.push(call);

      this.buySeries?.update(put as any);
      this.sellSeries?.update(call as any);
    }

    if (changes && changes['height'] && changes['height'].currentValue && this.height > 0) {
      this.chartHeight = this.height;
      this.onResize();
    }
  }

  public ngAfterViewInit(): void {

    if (!this.trendElement || !this.trendElement.nativeElement) return null;
    const element: HTMLElement = this.trendElement.nativeElement;
    
    let theme: string = localStorage.getItem('theme');
    theme = theme ? theme: Defaults.Theme;

    this.chart = createChart(element,
      {
        height: this.chartHeight,
        width: element.offsetWidth,
        handleScale: {
          mouseWheel: true,
          pinch: true
        },
        kineticScroll: {
          mouse: true,
          touch: true
        },
        handleScroll: {
          pressedMouseMove: true,
          horzTouchDrag: true,
          mouseWheel: true,
          vertTouchDrag: true
        },
        timeScale: {
          visible: true,
          timeVisible: true,
          secondsVisible: true
        },
        overlayPriceScales: {
          ticksVisible: true
        },
        crosshair: {
          horzLine: {
            visible: true
          },
          vertLine: {
            visible: true
          }
        },
        grid: {
          horzLines: {
            color: '#cccccc1f'
          },
          vertLines: {
            color: '#cccccc1f'
          }
        },
        layout: {
          background: {
            color: theme === 'light' ? '#fff': '#000'
          },
          textColor: theme === 'light' ? '#1e1e1e': '#fafafa'
        },
        rightPriceScale: {
          entireTextOnly: true,
          autoScale: true,
          alignLabels: true,
          borderVisible: false
        }
      }
    );

    this.chart.timeScale().applyOptions({
      borderColor: '#ccc'
    });

    this.chart.timeScale().fitContent();


    this.buySeries = this.chart.addLineSeries({
      color: 'rgba(239, 83, 80, 1)' 
    });

    this.sellSeries = this.chart.addLineSeries({
      color: 'rgba(38, 166, 154, 1)'
    });

    setInterval(() => {
      this.onResize();
    }, 1000);
    
    this.cdRef.detectChanges();
  }


  public timeToTz(originalTime: number): number {
    const d = new Date(originalTime);
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()) / 1000;
  }


}
