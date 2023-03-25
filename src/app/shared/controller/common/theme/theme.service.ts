import { OverlayContainer } from '@angular/cdk/overlay';
import { HostBinding, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { darkTheme, lightTheme } from 'src/app/shared/configuration/theme.config';
import { iState, iTheme } from 'src/app/shared/interface/state.interface';
import { iThemeProperties } from 'src/app/shared/interface/theme.interface';
import { Theme } from 'src/app/shared/state/action/theme.action';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentTheme: 'light' | 'dark' = 'light';
  @HostBinding('class') public className: string = 'material-light';

  constructor(
    private overlay: OverlayContainer,
    private store: Store<iState>
  ) {
    this.store.select(state => state.theme).subscribe({
      next: (theme: iTheme) => {
        localStorage.setItem('theme', theme.name);
        this.setTheme(theme.name);
      }
    });
  }

  public setTheme(theme: 'light' | 'dark' = 'light'): void {
    this.currentTheme = theme;
    let themeProperties: iThemeProperties = this.currentTheme === 'dark' ? darkTheme : lightTheme;
    
    Object.keys(themeProperties.properties).forEach((property: any) => {
      document.documentElement.style.setProperty(
        property,
        themeProperties.properties[property]
      );
    });

    

    this.updateMaterialTheme(theme);
  }

  public getCurrentTheme(): string {
    return localStorage.getItem('theme');
  }
  
  /**
   * Changing the material themes and overlay
   * @param theme  Either dark or light
   */
  private updateMaterialTheme(theme: 'dark' | 'light') {
    this.currentTheme = theme;
    this.className = theme == 'dark' ? 'material-dark' : 'material-light';

    if (theme == 'dark') {
      this.loadCss('dark.css', theme);
      this.overlay.getContainerElement().classList.remove('material-light');
      this.overlay.getContainerElement().classList.add('material-dark');
    } else {
      this.loadCss('light.css', theme);
      this.overlay.getContainerElement().classList.add('material-light');
      this.overlay.getContainerElement().classList.remove('material-dark');
    }
  }

  /**
  * Ant Design changes
  * @param href Pass bundleName ad href 
  * @param id Thme Name 
  * @returns 
 */
   private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = '/assets/theme/' + href;
      style.id = id;
      style.onload = resolve;
      style.onerror = reject;
      document.head.append(style);
    });
  }

}
