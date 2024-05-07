import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'depth-selector',
  templateUrl: './depth-selector.component.html',
  styleUrls: ['./depth-selector.component.scss']
})
export class DepthSelectorComponent {

  @Input() defaultDepth: number = 3;

  public depth: number = this.defaultDepth;
  public timeInterval: any;
  private interval: number = 500;

  @Output() updateDepth: EventEmitter<number> = new EventEmitter<number>();

  public increment(): void {
    if (this.depth >= 7) return null;
    this.depth = this.depth + 1;

    clearTimeout(this.timeInterval);

    this.timeInterval = setTimeout(() => {
      this.updateDepth.emit(this.depth);
    }, this.interval);
  }

  public decrement(): void {
    if (this.depth <= 1) return null;
    this.depth = this.depth - 1;

    clearTimeout(this.timeInterval);
    
    this.timeInterval = setTimeout(() => {
      this.updateDepth.emit(this.depth);
    }, this.interval);
  }

  
}
