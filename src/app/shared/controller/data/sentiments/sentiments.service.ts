import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iSentimentData } from 'src/app/shared/interface/sentimenet.interface';
import { iStrikePrice, iStrikePriceSentimentResponse } from 'src/app/shared/interface/strike-price.interface';
import { environment } from 'src/environment/environment';
import { CrudService } from '../../common/crud/crud.service';
import { DataService } from '../data/data.service';
import { Defaults } from 'src/app/shared/configuration/defaults.config';
import { iStrikePriceBuySellResponse } from 'src/app/shared/interface/strike-price-buy-sell.interface';
import { iSummary } from 'src/app/shared/interface/summary.interface';

@Injectable({
  providedIn: 'root'
})
export class SentimentsService {

  constructor(
    private crudService: CrudService,
    private dataService: DataService
  ) { }

  public getSentiments(date: Date, interval: number = 1, fromDate?: Date, toDate?: Date, depth: number = 5, index: string = Defaults.Index): Observable<iSentimentData[]> {
    
    let filter: string = this.dataService.getFilter(date, fromDate, toDate, index);
    
    return this.crudService.read(
      environment.api + 'api/',
      'MarketSentiment' + filter + '&interval=' + interval + '&depth=' + depth
    )
  }

  public getStrikeDetails(date: Date, interval: number = 1, strikePrice: number = 0, fromDate?: Date, toDate?: Date, depth: number = 5, index: string = Defaults.Index): Observable<iStrikePriceSentimentResponse> {
    let filter: string = this.dataService.getFilter(date, fromDate, toDate, index);

    return this.crudService.read(
      environment.api + 'api/',
      'StrikePrice' +  (strikePrice ? ('/' + strikePrice): '') + filter + '&interval=' + interval + '&depth=' + depth
    );
  }

  public getStrikesBuySell(date: Date, interval: number = 1, strikePrice: number = 0, fromDate?: Date, toDate?: Date, depth: number = 5, index: string = Defaults.Index): Observable<iStrikePriceBuySellResponse[]> {
    let filter: string = this.dataService.getFilter(date, fromDate, toDate, index);

    return this.crudService.read(
      environment.api + 'api/',
      'StrikePrice/buysell'  + filter + '&interval=' + interval + '&depth=' + depth
    );
  }

  public getSummary(date: Date, interval: number = 1, strikePrice: number = 0, fromDate?: Date, toDate?: Date, depth: number = 5, index: string = Defaults.Index): Observable<iSummary> {
    let filter: string = this.dataService.getFilter(date, fromDate, toDate, index);

    return this.crudService.read(
      environment.api + 'api/',
      'OCA'  + filter + '&interval=' + interval + '&depth=' + depth
    );
  }

}
