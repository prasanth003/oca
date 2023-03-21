import { Component, Output, EventEmitter } from '@angular/core';
import { iInterval } from '../../interface/interval.interface';

@Component({
  selector: 'interval-selector',
  templateUrl: './interval-selector.component.html',
  styleUrls: ['./interval-selector.component.scss']
})
export class IntervalSelectorComponent {
  
  @Output() onChange: EventEmitter<number> = new EventEmitter<number>();

  public intervals: iInterval[] = [
    {
      displayValue: '1M',
      value: 60,
      selected: true
    },
    {
      displayValue: '5M',
      value: 300,
      selected: false
    },
    {
      displayValue: '15M',
      value: 900,
      selected: false
    },
    {
      displayValue: '30M',
      value: 1800,
      selected: false
    },
    {
      displayValue: '45M',
      value: 2700,
      selected: false
    },
    {
      displayValue: '1H',
      value: 3600,
      selected: false
    }
  ];

  public onIntervalChange(interval: iInterval, index: number): void {
    this.intervals.map((interval: iInterval) => interval.selected = false);
    interval.selected = true;
    this.intervals[index] = interval;
    this.onChange.emit(interval.value);
  }
  
}
