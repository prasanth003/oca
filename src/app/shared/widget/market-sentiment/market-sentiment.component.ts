import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ECharts } from 'echarts';
import { EChartsOption } from 'echarts/types/dist/echarts';
import { createChart, IChartApi } from 'lightweight-charts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { iSentimentData } from '../../interface/sentimenet.interface';


@Component({
  selector: 'market-sentiment',
  templateUrl: './market-sentiment.component.html',
  styleUrls: ['./market-sentiment.component.scss']
})
export class MarketSentimentComponent implements AfterViewInit, OnChanges {
  
  public buyChart: IChartApi;
  public sellChart: IChartApi;
  private chartHeight: number = 70;
  public gauge: boolean = true;
  public chartInstance: ECharts;
  public chartOptions: EChartsOption;

  @ViewChild('buytrend') buyTrend: ElementRef;
  @ViewChild('selltrend') selltrend: ElementRef;
  @ViewChild('echart') echart: ElementRef<NgxEchartsDirective>;

  @Input() sentiments: iSentimentData[] = [];
  @Input() newRecord: iSentimentData;

  constructor(private cdRef: ChangeDetectorRef) { }

  /* Listing on window resize */
  @HostListener('window:resize', ['$event'])
  public onResize() {
    setTimeout(() => {
      this.resizeBuyChart();
      this.resizeSellChart();
    }, 100);

  }

  public ngAfterViewInit(): void {
    this.createBuyChart();
    this.createSellChart();
    // this.createGauge();
    this.onResize();
    this.cdRef.detectChanges();
  }

  public ngOnChanges(changes: SimpleChanges): void { 
    
    if (changes && changes['sentiments'] && changes['sentiments'].currentValue) {
      this.findProgress(this.sentiments);
    }

    if (changes && changes['newRecord'] && changes['newRecord'].currentValue) {
      this.findProgress(this.sentiments);
    }

  }

  private findProgress(sentiments: iSentimentData[]): void {
    if (!sentiments || sentiments.length <= 0) return null;

    let smallest: number = sentiments[0].sentiment;
    let largest: number = sentiments[0].sentiment;
    let currentSentiment: number = sentiments[sentiments.length - 1].sentiment;

    for (let i = 1; i < sentiments.length; i++) {
      const currentValue = sentiments[i].sentiment;
      if (currentValue < smallest) {
        smallest = currentValue;
      }
      if (currentValue > largest) {
        largest = currentValue;
      }
    }

    this.createGauge(smallest, largest, currentSentiment);


    console.log('sentiments', smallest, largest, currentSentiment);

  }

  private createBuyChart(): void {
    if (!this.buyTrend || !this.buyTrend.nativeElement) return null;
    const element: HTMLElement = this.buyTrend.nativeElement;

    this.buyChart = createChart(element,
      {
        height: this.chartHeight,
        width: element.offsetWidth,
        handleScale: {
          mouseWheel: false,
          pinch: false,
          axisPressedMouseMove: false,
          axisDoubleClickReset: false
        },
        timeScale: {
          visible: false,
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
            visible: false
          },
          vertLines: {
            visible: false
          }
        }

      }
    );

    const areaSeries = this.buyChart.addAreaSeries();

    const data = [{ value: 124567, time: 1642425322 }, { value: 234432, time: 1642511722 }, { value: 113823, time: 1642598122 }, { value: 232982, time: 1642684522 }, { value: 129811, time: 1642770922 }, { value: 438222, time: 1642857322 }, { value: 539392, time: 1642943722 }, { value: 638922, time: 1643030122 }, { value: 432821, time: 1643116522 }, { value: 699212, time: 1643202922 }];

    areaSeries.setData(data as any);

    this.buyChart.timeScale().fitContent();

    areaSeries.priceScale().applyOptions({
      visible: false,
      borderVisible: false
    });

    areaSeries.applyOptions({
      priceLineVisible: false
    });

    this.buyChart.timeScale().applyOptions({
      visible: false
    })
  }

  private createSellChart(): void {
    if (!this.selltrend || !this.selltrend.nativeElement) return null;
    const element: HTMLElement = this.selltrend.nativeElement;

    this.sellChart = createChart(element,
      {
        height: this.chartHeight,
        width: element.offsetWidth,
        handleScale: {
          mouseWheel: false,
          pinch: false,
          axisPressedMouseMove: false,
          axisDoubleClickReset: false
        },
        timeScale: {
          visible: false,
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
            visible: false
          },
          vertLines: {
            visible: false
          }
        }

      }
    );

    const areaSeries = this.sellChart.addAreaSeries({ lineColor: '#C83A3A', topColor: '#C83A3A', bottomColor: '#EFC4C41f' });

    const data = [{ value: 923212, time: 1642425322 }, { value: 723628, time: 1642511722 }, { value: 828323, time: 1642598122 }, { value: 723561, time: 1642684522 }, { value: 527311, time: 1642770922 }, { value: 239811, time: 1642857322 }, { value: 121872, time: 1642943722 }, { value: 321821, time: 1643030122 }, { value: 237822, time: 1643116522 }, { value: 129121, time: 1643202922 }];

    areaSeries.setData(data as any);

    this.sellChart.timeScale().fitContent();

    areaSeries.priceScale().applyOptions({
      visible: false,
      borderVisible: false
    });

    areaSeries.applyOptions({
      priceLineVisible: false
    });

    this.sellChart.timeScale().applyOptions({
      visible: false
    })
  }

  private resizeBuyChart(): void {
    if (!this.buyChart || !this.buyTrend || !this.buyTrend.nativeElement) return null;
    const element: HTMLElement = this.buyTrend.nativeElement;
    this.buyChart?.resize(element.offsetWidth, this.chartHeight, true);
  }

  private resizeSellChart(): void {
    if (!this.sellChart || !this.selltrend || !this.selltrend.nativeElement) return null;
    const element: HTMLElement = this.selltrend.nativeElement;
    this.sellChart?.resize(element.offsetWidth, this.chartHeight, true);
  }

  public onChartInit(event: ECharts): void {
    this.chartInstance = event;
  }

  public switchToGauge(): void {
    this.gauge = this.gauge ? false: true;
    if (this.gauge) this.chartInstance.setOption({
      stateAnimation: {
        duration: 4
      }
    });
    
    this.onResize();
  }

  private createGauge(min: number, max: number, currentValue: number): void {   
    this.chartOptions =  {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '75%'],
          radius: '80%',
          min: min,
          max: max,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.25, '#FF6E76'],
                [0.5, '#FDDD60'],
                [0.75, '#58D9F9'],
                [1, '#7CFFB2']
              ]
            }
          },
          axisLabel: {
            color: '#464646',
            fontSize: 10,
            distance: -30,
            rotate: 'tangential',
            formatter: function (value) {
              if (value === max) {
                return 'Strong Buy';
              } else if (value === max % 50) {
                return 'Buy';
              } else if (value === max % 75) {
                return 'Sell';
              } else if (value === min) {
                return 'Strong Sell';
              }
              return '';
            }
          },
          title: {
            offsetCenter: [0, '-10%'],
            fontSize: 20
          },
          detail: {
            fontSize: 10,
            offsetCenter: [0, '-35%'],
            valueAnimation: true,
            formatter: function (value) {
              return Math.round(value) + '';
            },
            color: 'inherit'
          },
          data: [
            {
              value: currentValue
            }
          ]
        }
      ]
    };

  }

}
