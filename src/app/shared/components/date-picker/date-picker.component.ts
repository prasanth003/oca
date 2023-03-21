import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
  
  @Output() onDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  public date: Date = new Date();

  public onDateSelection(): void {
    this.onDateChange.emit(this.date);
  }

}
