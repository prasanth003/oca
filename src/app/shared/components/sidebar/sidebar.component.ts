import { Component } from '@angular/core';

@Component({
  selector: 'oca-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  navItems = [
    { name: 'Market', icon: 'show_chart', link: '/dashboard' },
    { name: 'Summary', icon: 'book', link: '/users' },
    { name: 'Analysis', icon: 'compare', link: '/settings' },
    { name: 'Profile', icon: 'mood', link: '/settings' },
    { name: 'Settings', icon: 'settings', link: '/settings' }
  ];

}
