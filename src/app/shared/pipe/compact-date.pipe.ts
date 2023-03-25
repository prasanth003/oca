import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compactDate'
})
export class CompactDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    const datePipe: DatePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(value, 'd MMMM');
    const day = value.getDate();
    const suffix = this.getSuffix(day);
    const splittedDate = formattedDate.split(' ');
    return splittedDate[0] + suffix + ' ' + splittedDate[1];
  }

  private getSuffix(day: number): string {
    if (day > 3 && day < 21) {
      return 'th';
    }
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

}
