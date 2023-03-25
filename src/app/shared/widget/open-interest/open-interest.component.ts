import { Component, Input } from '@angular/core';

@Component({
  selector: 'open-interest',
  templateUrl: './open-interest.component.html',
  styleUrls: ['./open-interest.component.scss']
})
export class OpenInterestComponent {

  @Input() type: 'put' | 'call' = 'put';

}
