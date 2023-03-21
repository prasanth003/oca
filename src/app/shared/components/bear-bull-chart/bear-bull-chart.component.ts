import { Component, AfterViewInit } from '@angular/core';
import { createChart, IChartApi } from 'lightweight-charts';



@Component({
  selector: 'bear-and-bull',
  templateUrl: './bear-bull-chart.component.html',
  styleUrls: ['./bear-bull-chart.component.scss']
})
export class BearBullChartComponent implements AfterViewInit {

  public chart: IChartApi;

  constructor() { }

  public ngAfterViewInit(): void {
    if (document.getElementById('bear-bull') && document.getElementById('bear-bull') !== null) {
      let htmlelement: HTMLElement = document.getElementById('bear-bull');
      const currentLocale = window.navigator.languages[0];
      // Create a number format using Intl.NumberFormat
      const myPriceFormatter = Intl.NumberFormat(currentLocale, {
        style: 'currency',
        currency: 'INR', // Currency for data points
      }).format;

      this.chart = createChart(htmlelement,
        {
          height: 400,
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
            // background: {
            //   color: '#1e1e1e'
            // },
            textColor: '#333'
          },
          localization: {
            priceFormatter: myPriceFormatter
          }
          // grid: {
          //   horzLines: {
          //     color: '#cccccc1f'
          //   },
          //   vertLines: {
          //     color: '#cccccc1f'
          //   }
          // }

        }
      );

      const lineSeries = this.chart.addAreaSeries();

      lineSeries.applyOptions({
        title: 'Bull'
      });

      lineSeries.priceScale().applyOptions({
        borderColor: '#ccc'
      });

      this.chart.timeScale().applyOptions({
        borderColor: '#ccc'
      })

      setInterval(() => {
        lineSeries.update({ time: (Date.now() / 1000) as any, value: this.generateRandom() });
      }, 1);
    }
  }

  generateRandom(maxLimit = 500) {
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand); // 99
    return rand;
  }
}
