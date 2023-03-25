import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { iInterval } from '../../interface/interval.interface';
import { iOptions, iState } from '../../interface/state.interface';

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
      value: 1,
      selected: true
    },
    {
      displayValue: '5M',
      value: 5,
      selected: false
    },
    {
      displayValue: '15M',
      value: 15,
      selected: false
    },
    {
      displayValue: '30M',
      value: 30,
      selected: false
    },
    {
      displayValue: '45M',
      value: 45,
      selected: false
    },
    {
      displayValue: '1H',
      value: 60,
      selected: false
    }
  ];

  constructor(private store: Store<iState>) {
    this.store.select(state => state.option).subscribe({
      next: (option: iOptions) => {
        this.intervals.forEach((interval: iInterval) => interval.selected = false);
        const index: number = this.intervals.findIndex((interval: iInterval) => interval.value === option.interval);
        if (index !== -1) {
          this.intervals[index].selected = true;
        }
      }
    });
  }

  public onIntervalChange(interval: iInterval, index: number): void {
    this.intervals.forEach((interval: iInterval) => interval.selected = false);
    interval.selected = true;
    this.intervals[index] = interval;
    this.onChange.emit(interval.value);
  }
  
}
