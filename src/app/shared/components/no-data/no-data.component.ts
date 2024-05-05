import { Component, Input } from '@angular/core';

@Component({
  selector: 'no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent {

  @Input() height: number = 0;
  @Input() message: string = '';

}
