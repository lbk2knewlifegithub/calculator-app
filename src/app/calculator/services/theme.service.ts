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
    if (theme === 0) document.body.className = `font-mono bg-main text-fill`;
    if (theme === 1)
      document.body.className = `font-mono bg-main text-fill theme-1`;
    if (theme === 2)
      document.body.className = `font-mono bg-main text-fill theme-2`;
    this._theme.next(theme);
    localStorage.setItem(this.themeKey, JSON.stringify(theme));
  }
}
