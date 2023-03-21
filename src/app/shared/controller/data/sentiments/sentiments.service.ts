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

  public getSentiments(date: Date): Observable<iSentimentData[]> {
    date.setHours(20, 60);
    return this.crudService.read(
      'https://35b3-202-78-235-221.in.ngrok.io/api/',
      'MarketSentiment?timestamp=' + date.toISOString() // '2023-03-21 15:36:54.0000000'
    )
  }
}
