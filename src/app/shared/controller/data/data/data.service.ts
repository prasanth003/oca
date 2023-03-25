import { Injectable } from '@angular/core';

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

}
