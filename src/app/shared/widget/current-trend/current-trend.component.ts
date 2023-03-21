import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { formatNumber } from '../../helpers/number-formatter.helper';
import { iSentimentData } from '../../interface/sentimenet.interface';

@Component({
  selector: 'current-trend',
  templateUrl: './current-trend.component.html',
  styleUrls: ['./current-trend.component.scss']
})
export class CurrentTrendComponent implements AfterViewInit, OnChanges {

  public chart: IChartApi;
  private chartHeight: number = 400;
  private chartData: { value: number, time: number }[] = [];
  public areaSeries: ISeriesApi<'Baseline'>;

  @ViewChild('currentTrend') trendElement: ElementRef;
  
  @Input() sentiments: iSentimentData[] = [];
  @Input() newRecord: iSentimentData;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  /* Listing on window resize */
  @HostListener('window:resize', ['$event'])
  public onResize() {
    if (!this.chart || !this.trendElement || !this.trendElement.nativeElement) return null;
    const element: HTMLElement = this.trendElement.nativeElement;
    this.chart.resize(element.offsetWidth, this.chartHeight, true);
  }

  public ngOnChanges(changes: SimpleChanges): void { 
    
    if (changes && changes['sentiments'] && changes['sentiments'].currentValue) {
      this.chartData = this.sentiments.map((value) => { return { value: value.sentiment, time: this.timeToTz(value.timestamp) } });
      this.areaSeries?.setData(this.chartData as any);
    }

    if (changes && changes['newRecord'] && changes['newRecord'].currentValue) {
      const data: any = {
        value: this.newRecord.sentiment,
        time: this.timeToTz(this.newRecord.timestamp)
      }
      this.chartData.push(data);
      this.areaSeries?.update(data as any);
    }

    this.onResize();
  }

  public ngAfterViewInit(): void {

    if (!this.trendElement || !this.trendElement.nativeElement) return null;
    const element: HTMLElement = this.trendElement.nativeElement;

    this.chart = createChart(element,
      {
        height: this.chartHeight,
        width: element.offsetWidth,
        handleScale: {
          mouseWheel: true,
          pinch: true
        },
        timeScale: {
          visible: true,
          timeVisible: true,
          secondsVisible: true
        },
        crosshair: {
          horzLine: {
            visible: true
          },
          vertLine: {
            visible: true
          }
        },
        layout: {
          textColor: '#333'
        },
        grid: {
          horzLines: {
            color: '#cccccc1f'
          },
          vertLines: {
            color: '#cccccc1f'
          }
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

    // this.areaSeries.priceFormatter().format(formatNumber)

    this.cdRef.detectChanges();

  }


  public timeToTz(originalTime: number): number {
    const d = new Date(originalTime);
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()) / 1000;
  }
}

