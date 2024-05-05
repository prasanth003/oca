import { Component, Input } from '@angular/core';
import { iQuantity } from '../../interface/summary.interface';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {

  @Input() public quantity: iQuantity;

  public getProgress(quantity: iQuantity): number {    

    if (!quantity) return 0;

    const current: number  = quantity.current;
    const smallest: number = quantity.min;
    const largest: number  = quantity.max;

    const progress: number = ((current - smallest) / (largest - smallest)) * 100;
    
    return progress;
    
  }
  
  public getProgressPercentage(current: number, smallest: number, largest: number): { progress: number, changePercent: number } {

    let progress: number = ((current - smallest) / (largest - smallest)) * 100;

    return { progress, changePercent: 0 };
  }

}
