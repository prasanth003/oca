import { Component, Input } from '@angular/core';
import { OptionService } from '../../controller/common/option/option.service';

@Component({
  selector: 'oca-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() height: number = 70;

  constructor(private option: OptionService) {}

  public onDepthChange(depth: number): void {
    this.option.updateDepth(depth);
    sessionStorage.setItem('depth', depth.toString());
  }


  public onDateChange(date: Date): void {
    this.option.updateDate(date);
    sessionStorage.setItem('date', date.toString());
  }

  public onIntervalChange(interval: number): void {
    this.option.updateInterval(interval);
    sessionStorage.setItem('interval', interval.toString());
  }

}
