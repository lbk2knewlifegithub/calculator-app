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
    const theme = value ? parseInt(value) : 0;
    this.setTheme(theme);
  }

  setTheme(theme: number): void {
    document.body.className = `font-mono bg-main text-fill theme-${theme}`;
    this._theme.next(theme);
    localStorage.setItem(this.themeKey, JSON.stringify(theme));
  }
}
