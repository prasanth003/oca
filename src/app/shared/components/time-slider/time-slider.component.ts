import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Output } from '@angular/core';
import { getMarketTime } from '../../helpers/date.helper';

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

  @Output() onTimeChange: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  public options: Options = {
    floor: this.dateRange[0].getTime(),
    ceil: this.dateRange[1].getTime(),
    translate: (value: number, label: LabelType): string => {
      return new Date(value).getHours() + ':' + new Date(value).getMinutes();
    }
  };
  
  /**
   * Trigger when the slider changes
  */
  public onSliderChange(): void {
    this.onTimeChange.emit([
      new Date(this.minValue),
      new Date(this.maxValue)
    ]);
  }
}
