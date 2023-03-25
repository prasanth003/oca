import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { iOptions, iState } from '../../interface/state.interface';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
  
  @Output() onDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  public date: Date = new Date();

  constructor(private store: Store<iState>) {
    this.store.select(state => state.option).subscribe({
      next: (option: iOptions) => this.date = option.currentDate
    });
  }

  public onDateSelection(): void {
    this.onDateChange.emit(this.date);
  }

}
