import { Component, EventEmitter, Output } from '@angular/core';
import { formatNumber } from '../../helpers/number-formatter.helper';
import { iIndices } from '../../interface/indices.interface';
import { OptionService } from '../../controller/common/option/option.service';
import { Store } from '@ngrx/store';
import { iOptions, iState } from '../../interface/state.interface';

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
      percentageChange: -0.65,
      active: true,
      value: 'NIFTY BANK'
    },
    {
      symbol: 'Nifty',
      currentPrice: 121002,
      icon: '50',
      percentageChange: 0.71,
      active: false,
      value: 'NIFTY'
    },
    {
      symbol: 'FIN Nifty',
      currentPrice: 121002,
      icon: 'FN',
      percentageChange: 0.71,
      active: false,
      value: 'FINNIFTY'
    },
    {
      symbol: 'MIDCPNIFTY',
      currentPrice: 121002,
      icon: 'MID',
      percentageChange: 0.71,
      active: false,
      value: 'MIDCPNIFTY'
    }
  ];

  public index: string = "NIFTY";

  constructor(
    private store: Store<iState>,
    private option: OptionService
  ) {
    this.store.select(state => state.option).subscribe({
      next: (option: iOptions) => {
        if (option && option.index) {
          this.index = option.index;
          sessionStorage.setItem('index', option.index);
        }
      }
    })
  }

  public onIndexSelect(index: string): void {
    this.index = index;
    this.option.updateIndex(this.index);
  }
}
