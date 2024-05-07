import { Component, Input } from '@angular/core';
import { iStrikePrice } from 'src/app/shared/interface/summary.interface';

@Component({
  selector: 'summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent {

  @Input() public atm: number = 0;
  @Input() public strikeDetails: iStrikePrice;

  public panelOpenState: boolean = false;

  public getDifference(): number {
    return (this.strikeDetails?.putOption?.tradedQty?.current - this.strikeDetails?.callOption?.tradedQty?.current) ?? 0;
  }

}
