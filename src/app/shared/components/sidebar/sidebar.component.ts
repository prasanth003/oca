import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThemeService } from '../../controller/common/theme/theme.service';
import { iState, iTheme } from '../../interface/state.interface';
import { Theme } from '../../state/action/theme.action';

@Component({
  selector: 'oca-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public currentTheme: 'light' | 'dark' = 'light';
  
  public navItems = [
    { name: 'Market', icon: 'show_chart', link: '/dashboard' },
    { name: 'Summary', icon: 'book', link: '/users' },
    { name: 'Analysis', icon: 'compare', link: '/settings' },
    { name: 'Profile', icon: 'mood', link: '/settings' },
    { name: 'Settings', icon: 'settings', link: '/settings' }
  ];

  constructor(private store: Store<iState>) {
    this.store.select(state => state.theme).subscribe({
      next: (res: iTheme) => this.currentTheme = res.name
    })

  }

  public switchTheme(theme: 'light' | 'dark'): void {
    this.currentTheme = theme;
    this.store.dispatch(new Theme(theme));
  }

}
