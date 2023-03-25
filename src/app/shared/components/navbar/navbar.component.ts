import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { OptionService } from '../../controller/common/option/option.service';
import { iState } from '../../interface/state.interface';
import { Options } from '../../state/action/option.action';

@Component({
  selector: 'oca-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() height: number = 70;

  constructor(private option: OptionService) {}


  public onDateChange(date: Date): void {
    this.option.updateDate(date);
    localStorage.setItem('date', date.toString());
  }

  public onIntervalChange(interval: number): void {
    this.option.updateInterval(interval);
    localStorage.setItem('interval', interval.toString());
  }

}
