import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { iOptions, iState } from 'src/app/shared/interface/state.interface';
import { Options } from 'src/app/shared/state/action/option.action';
import { DefaultState } from 'src/app/shared/state/state/default.state';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  public options: iOptions = DefaultState.option;

  constructor(private store: Store<iState>) { 
    this.store.select(state => state.option).subscribe({
      next: (option: iOptions) => this.options = option
    });
  }

  public updateDate(date: Date): void {
    this.store.dispatch(new Options({ ...this.options, currentDate: date }));
  }

  public updateInterval(interval: number): void {
    this.store.dispatch(new Options({ ...this.options, interval: interval }));
  }

  public updateRange(range: Date[]): void {
    this.store.dispatch(new Options({ ...this.options, range: range }));
  }

  public updateIndex(index: string): void {
    this.store.dispatch(new Options({ ...this.options, index: index }));
  }

  public updateDepth(depth: number): void {
    this.store.dispatch(new Options({ ...this.options, depth: depth }));
  }
}
