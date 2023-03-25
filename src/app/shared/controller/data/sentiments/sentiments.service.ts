import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iSentimentData } from 'src/app/shared/interface/sentimenet.interface';
import { CrudService } from '../../common/crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class SentimentsService {

  constructor(
    private crudService: CrudService
  ) { }

  public getSentiments(date: Date, interval: number = 1, fromDate?: Date, toDate?: Date): Observable<iSentimentData[]> {
    
    let filter: string = '';

    if (fromDate && toDate) {
      fromDate = new Date(fromDate);
      toDate = new Date(toDate);

      let fromTime: Date = new Date(date.setHours(fromDate.getHours(), fromDate.getMinutes()));
      let toTime: Date = new Date(date.setHours(toDate.getHours(), toDate.getMinutes()));

      filter = '?fromDate=' + new Date(fromTime.getTime() - (fromTime.getTimezoneOffset() * 60000)).toISOString() + 
               '&toDate=' + new Date(toTime.getTime() - (toTime.getTimezoneOffset() * 60000)).toISOString();
               
    } else {
      
      let fromTime: Date = new Date(date.setHours(9, 15));
      let toTime: Date = new Date(date.setHours(15, 30));

      filter = '?fromDate=' + new Date(fromTime.getTime() - (fromTime.getTimezoneOffset() * 60000)).toISOString() + 
               '&toDate=' + new Date(toTime.getTime() - (toTime.getTimezoneOffset() * 60000)).toISOString();
    }
    
    return this.crudService.read(
      'https://35b3-202-78-235-221.in.ngrok.io/api/',
      'MarketSentiment' + filter + '&interval=' + interval
    )
  }
}
