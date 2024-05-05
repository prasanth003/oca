import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts';
import { iADRatio } from '../../interface/strike-price.interface';

@Component({
  selector: 'bank-ratio',
  templateUrl: './bank-ratio.component.html',
  styleUrls: ['./bank-ratio.component.scss']
})
export class BankRatioComponent implements OnChanges {
  
  public chartInstance: ECharts;

  @Input() adRatio: iADRatio;

  public chartOption: EChartsOption;

  public onChartInit(event: ECharts): void {
    this.chartInstance = event;
  }

  public ngOnChanges(changes: SimpleChanges): void { 
    if (changes && changes['adRatio'] && changes['adRatio'].currentValue) {
      this.createPie(this.adRatio);
    }
  }

  private createPie(sentiment: iADRatio): void {   
    this.chartOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: 'Banks',
          type: 'pie',
          radius: [20, 80],
          // center: ['25%', '50%'],
          roseType: 'radius',
          itemStyle: {
            borderRadius: 5
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true
            }
          },
          data: [
            { value: sentiment.advance, name: 'Advance' },
            { value: sentiment.decline, name: 'Decline' },
            { value: sentiment.unchanged, name: 'Un Changed' }
          ],
          color: ['#008A19', '#C83A3A', '#113785']
        }
      ]
    };
  }
}
