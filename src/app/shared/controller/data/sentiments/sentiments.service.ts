import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { CrudService } from '../../common/crud/crud.service';
import { DataService } from '../data/data.service';
import { Defaults } from 'src/app/shared/configuration/defaults.config';
import { iSummary } from 'src/app/shared/interface/summary.interface';

@Injectable({
  providedIn: 'root'
})
export class SentimentsService {

  constructor(
    private crudService: CrudService,
    private dataService: DataService
  ) { }

  public getSummary(date: Date, interval: number = 1, strikePrice: number = 0, fromDate?: Date, toDate?: Date, depth: number = 5, index: string = Defaults.Index): Observable<iSummary> {
    let filter: string = this.dataService.getFilter(date, fromDate, toDate, index);

    return this.crudService.read(
      environment.api + 'api/',
      'OCA'  + filter + '&interval=' + interval + '&depth=' + depth
    );
  }

}
