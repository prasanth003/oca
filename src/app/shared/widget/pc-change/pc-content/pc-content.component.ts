import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { createChart, IChartApi } from 'lightweight-charts';
import { formatNumber } from 'src/app/shared/helpers/number-formatter.helper';
import { iSentimentData } from 'src/app/shared/interface/sentimenet.interface';

@Component({
  selector: 'pc-content',
  templateUrl: './pc-content.component.html',
  styleUrls: ['./pc-content.component.scss']
})
export class PcContentComponent implements AfterViewInit {

  public chart: IChartApi;
  private chartHeight: number = 50;

  @ViewChild('minitrend') trendElement: ElementRef;
  @Input() sentiment: iSentimentData;

  constructor(private cdRef: ChangeDetectorRef) { }

  public ngAfterViewInit(): void {
    
    if (!this.trendElement || !this.trendElement.nativeElement) return null;
    const element: HTMLElement = this.trendElement.nativeElement;

    this.chart = createChart(element,
      {
        height: this.chartHeight,
        width: 100,
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

    const areaSeries = this.chart.addAreaSeries();

    const data = [{ value: 124567, time: 1642425322 }, { value: 234432, time: 1642511722 }, { value: 113823, time: 1642598122 }, { value: 232982, time: 1642684522 }, { value: 129811, time: 1642770922 }, { value: 438222, time: 1642857322 }, { value: 539392, time: 1642943722 }, { value: 638922, time: 1643030122 }, { value: 432821, time: 1643116522 }, { value: 699212, time: 1643202922 }];

    areaSeries.setData(data as any);

    this.chart.timeScale().fitContent();

    areaSeries.priceScale().applyOptions({
      visible: false,
      borderVisible: false
    });

    areaSeries.applyOptions({
      priceLineVisible: false
    });

    this.chart.timeScale().applyOptions({
      visible: false
    })

    this.cdRef.detectChanges();
  }

  public timeToTz(originalTime: number): string {
    const d = new Date(originalTime);
    let hour: number = d.getHours();
    let minute: number = d.getMinutes();
    return (hour < 10 ? ('0' + hour): hour) + ':' + (minute < 10 ? ('0' + minute): minute);
  }

  public convertPrice(price: number): string {
    return formatNumber(price);
  }
}
