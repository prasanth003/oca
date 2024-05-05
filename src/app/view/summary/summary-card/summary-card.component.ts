import { Component, Input } from '@angular/core';
import { iStrikePrice } from 'src/app/shared/interface/summary.interface';

@Component({
  selector: 'summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent {

  @Input() public strikeDetails: iStrikePrice;

}
