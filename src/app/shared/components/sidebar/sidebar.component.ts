import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Menu } from '../../configuration/menu.config';
import { iMenu } from '../../interface/menu.interface';
import { iState, iTheme } from '../../interface/state.interface';
import { Theme } from '../../state/action/theme.action';

@Component({
  selector: 'oca-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {

  public currentTheme: 'light' | 'dark' = 'light';
  public activeClass: string = 'active';
  public menu: iMenu[] = Menu;
  
  constructor(
    private store: Store<iState>,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  public ngAfterViewInit(): void {
    this.store.select(state => state.theme).subscribe({
      next: (theme: iTheme) => { 
        this.currentTheme = theme.name;
        this.activeClass = this.currentTheme === 'light' ? 'active': 'active-dark';
        this.cdr.detectChanges();
      }
    });
  }

  public switchTheme(theme: 'light' | 'dark'): void {
    this.store.dispatch(new Theme(theme));
  }

  public isActive(path: string): boolean {
    if (this.router.url === path) return true;
    return false;
  }

}
