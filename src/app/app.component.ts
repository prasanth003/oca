import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OptionService } from './shared/controller/common/option/option.service';
import { ThemeService } from './shared/controller/common/theme/theme.service';
import { iState } from './shared/interface/state.interface';
import { Theme } from './shared/state/action/theme.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  
  constructor(
    private store: Store<iState>,
    private ts: ThemeService,
    private options: OptionService
  ) {}

  public ngAfterViewInit(): void {
    
    const currentTheme: string = localStorage.getItem('theme');
    this.store.dispatch(new Theme(currentTheme ? currentTheme: 'light'));

    // options
    const currentDate: string = localStorage.getItem('date');
    if (currentDate) {
      this.options.updateDate(new Date(currentDate));
    }

    const interval: string = localStorage.getItem('interval');
    if (interval) {
      this.options.updateInterval(parseInt(interval));
    }

    const range: string = localStorage.getItem('range');
    if (range) {
      this.options.updateRange(JSON.parse(range));
    }
  }

}
