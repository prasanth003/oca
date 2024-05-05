import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { Defaults } from '../../configuration/defaults.config';
import { iState, iTheme } from '../../interface/state.interface';
import { iSentiment } from '../../interface/strike-price.interface';

@Component({
  selector: 'current-trend',
  templateUrl: './current-trend.component.html',
  styleUrls: ['./current-trend.component.scss']
})
export class CurrentTrendComponent implements AfterViewInit, OnChanges {

  public chart: IChartApi;
  private chartHeight: number = 450;
  private chartData: { value: number, time: number }[] = [];
  public areaSeries: ISeriesApi<'Baseline'>;

  @ViewChild('currentTrend') trendElement: ElementRef;

  @Input() height: number;
  @Input() trendData: iSentiment[] = [];
  @Input() newRecord: iSentiment;

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
    
    if (changes && changes['trendData'] && changes['trendData'].currentValue) {
      this.chartData = this.trendData.map((value) => { return { value: value.current, time: this.timeToTz(value.timestamp) } });
      this.areaSeries?.setData(this.chartData as any);
    }

    if (changes && changes['newRecord'] && changes['newRecord'].currentValue) {
      const data: any = {
        value: this.newRecord.current,
        time: this.timeToTz(this.newRecord.timestamp)
      }
      this.chartData.push(data);
      this.areaSeries?.update(data as any);
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
    this.areaSeries = this.chart.addBaselineSeries();

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

