import { Component } from '@angular/core';
import { formatNumber } from '../../helpers/number-formatter.helper';
import { iIndices } from '../../interface/indices.interface';

@Component({
  selector: 'select-index',
  templateUrl: './indices.component.html',
  styleUrls: ['./indices.component.scss']
})
export class IndicesComponent {

  public indices: iIndices[] = [
    {
      symbol: 'Bank Nifty',
      currentPrice: 121002,
      icon: 'BN',
      percentageChange: -0.65
    },
    {
      symbol: 'Nifty',
      currentPrice: 121002,
      icon: '50',
      percentageChange: 0.71
    }
  ]

  public convertPrice(price: number): string {
    return formatNumber(price);
  }
}
