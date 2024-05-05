import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts';
import { iQuantity } from '../../interface/summary.interface';

@Component({
  selector: 'gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss']
})
export class GaugeChartComponent implements OnChanges {

  @Input() public qunatity: iQuantity;
 
  public chartHeight: number = 100;
  
  public chartInstance: ECharts;
  
  public chartOptions: EChartsOption = null;

  @Input() public quantity: iQuantity;
  
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes?.['quantity'] && changes?.['quantity']?.currentValue) {
      this.createGauge(this.quantity);
    }  
  }

  public onChartInit(event: ECharts): void {
    this.chartInstance = event;
  }

  private createGauge(sentiment: iQuantity): void {
    this.chartOptions = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '75%'],
          radius: '100%',
          min: sentiment.min,
          max: sentiment.max,
          splitNumber: 1,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.25, '#C83A3A'],
                [0.5, '#EFC4C4'],
                [0.75, '#CCE8D1'],
                [1, '#008A19']
              ]
            }
          },
          axisLabel: {
            show: false,
            color: '#464646',
            fontSize: 10,
            distance: -10,
            lineHeight: 30,
            rotate: 'tangential',
            formatter: function (value) {
              if (value === 100) {
                return 'Strong Buy';
              } else if (value === 100 % 50) {
                return 'Buy';
              } else if (value === 100 % 75) {
                return 'Sell';
              } else if (value === 0) {
                return 'Strong Sell';
              }
              return '';
            },
            valueAnimation: true
          },
          title: {
            show: false
          },
          detail: {
            fontSize: 14,
            offsetCenter: [0, '40%'],
            valueAnimation: true,
            formatter: function (value) {
              return Math.round(value) + '';
            },
            color: 'inherit'
          },
          data: [
            {
              value: sentiment.current
            }
          ]
        }
      ]
    };
  }


}
