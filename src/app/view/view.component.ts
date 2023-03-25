import { Component, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements AfterViewInit {
  
  public isHandset: boolean = false;
  public availableHeight: number = 0;
  public sidebarWidth: number = 80;
  public navbarHeight: number = 70;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdRef: ChangeDetectorRef
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isHandset = result.matches;
    });
  }

  /* Listing on window resize */
  @HostListener('window:resize', ['$event'])
  public onResize() {
    const spacing: number = 0;
    const availableHeight: number = window.innerHeight - spacing;
    this.availableHeight = availableHeight;
  }

  public ngAfterViewInit(): void {
    this.onResize();
    this.cdRef.detectChanges();
  }

}
