import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  themeKey = 'theme';
  private readonly _theme = new BehaviorSubject(0);
  theme$ = this._theme.asObservable();

  constructor() {}

  loadTheme(): void {
    const value = localStorage.getItem(this.themeKey);
    const theme = value ?  parseInt(value) : 0;
    console.log('theme ' + theme);

    this.setTheme(theme);
  }

  private themeName(theme: number): string {
    return `theme-${theme + 1}`;
  }

  setTheme(theme: number): void {
    // remove  previous theme
    const previousTheme = this.themeName(this._theme.value);
    if (document.body.classList.contains(previousTheme)) {
      document.body.classList.remove(previousTheme);
    }

    // add new theme
    if (theme !== 0) {
      document.body.classList.add(this.themeName(theme));
    }

    this._theme.next(theme);
    localStorage.setItem(this.themeKey, JSON.stringify(theme));
  }
}
