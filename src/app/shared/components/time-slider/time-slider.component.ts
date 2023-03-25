import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { OptionService } from '../../controller/common/option/option.service';
import { getMarketTime } from '../../helpers/date.helper';
import { iOptions, iState } from '../../interface/state.interface';

const date: Date = new Date();
date.setHours(9, 15);

const toDate: Date = new Date();
toDate.setHours(15, 30);

@Component({
  selector: 'time-slider',
  templateUrl: './time-slider.component.html',
  styleUrls: ['./time-slider.component.scss']
})
export class TimeSliderComponent {

  private dateRange: Date[] = getMarketTime();
  public minValue: number = date.getTime();
  public maxValue: number = toDate.getTime();

  constructor(
    private store: Store<iState>,
    private option: OptionService
  ) {
    this.store.select(state => state.option).subscribe({
      next: (option: iOptions) => {
        if (option && option.range && option.range[0] && option.range[1]) {
          this.minValue = new Date(option.range[0]).getTime();
          this.maxValue = new Date(option.range[1]).getTime();
        }
      }
    })
  }

  public options: Options = {
    floor: this.dateRange[0].getTime(),
    ceil: this.dateRange[1].getTime(),
    translate: (value: number, label: LabelType): string => {
      return new Date(value).getHours() + ':' + new Date(value).getMinutes();
    }
  };
  
  /**
   * Update the state when the slider changes
  */
  public onSliderChange(): void {
    const range: Date[] = [
      new Date(this.minValue),
      new Date(this.maxValue)
    ];

    sessionStorage.setItem('range', JSON.stringify(range));
    this.option.updateRange(range);
  }
}
