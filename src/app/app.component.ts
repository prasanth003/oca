import { Component, AfterViewInit } from '@angular/core';
import { OptionService } from './shared/controller/common/option/option.service';
import { ThemeService } from './shared/controller/common/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  
  constructor(
    private ts: ThemeService,
    private options: OptionService
  ) { }

  public ngAfterViewInit(): void {
    
    // options
    const currentDate: string = sessionStorage.getItem('date');
    if (currentDate) {
      this.options.updateDate(new Date(currentDate));
    }

    const interval: string = sessionStorage.getItem('interval');
    if (interval) {
      this.options.updateInterval(parseInt(interval));
    }

    const range: string = sessionStorage.getItem('range');
    if (range) {
      this.options.updateRange(JSON.parse(range));
    }

    const index: string = sessionStorage.getItem('index');
    if (index) {
      this.options.updateIndex(index);
    }
  }

}
