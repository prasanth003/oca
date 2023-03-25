import { Component, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { iState, iTheme } from '../shared/interface/state.interface';
import { Defaults } from '../shared/configuration/defaults.config';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements AfterViewInit {
  
  public isHandset: boolean = false;
  public availableHeight: number = 0;
  public sidebarWidth: number = 70;
  public navbarHeight: number = 70;
  public theme: string = Defaults.Theme;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdRef: ChangeDetectorRef,
    private store: Store<iState> 
  ) {
    
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isHandset = result.matches;
    });

    this.store.select(state => state.theme).subscribe({
      next: (theme: iTheme) => this.theme = theme.name
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
