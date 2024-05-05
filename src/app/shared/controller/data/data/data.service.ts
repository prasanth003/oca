import { Injectable } from '@angular/core';
import { Defaults } from 'src/app/shared/configuration/defaults.config';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public useInterval(date: Date): boolean {
    
    const currentDate: Date = new Date();
  
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 15, 0); // set start time to 9:15 AM
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 30, 0); // set end time to 3:30 PM

    if ((currentDate.getDate() === date.getDate()) 
        && (date  >= start && date <= end)) return true;
    return false;
  }


  public getFilter(date: Date, fromDate?: Date, toDate?: Date, index: string = Defaults.Index): string {
    let filter: string = '';

    if (fromDate && toDate) {
      fromDate = new Date(fromDate);
      toDate = new Date(toDate);

      let fromTime: Date = new Date(date.setHours(fromDate.getHours(), fromDate.getMinutes()));
      let toTime: Date = new Date(date.setHours(toDate.getHours(), toDate.getMinutes()));

      filter = '?startDate=' + new Date(fromTime.getTime() - (fromTime.getTimezoneOffset() * 60000)).toISOString() + 
               '&endDate=' + new Date(toTime.getTime() - (toTime.getTimezoneOffset() * 60000)).toISOString();
               
    } else {
      
      let fromTime: Date = new Date(date.setHours(9, 15));
      let toTime: Date = new Date(date.setHours(15, 30));

      filter = '?startDate=' + new Date(fromTime.getTime() - (fromTime.getTimezoneOffset() * 60000)).toISOString() + 
               '&endDate=' + new Date(toTime.getTime() - (toTime.getTimezoneOffset() * 60000)).toISOString();
    }

    filter = filter + '&indexName=' + index;
    
    return filter;
  }

}
