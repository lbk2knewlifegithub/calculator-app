import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'lbk-calculator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid">
      <lbk-navbar
        [theme]="(theme$ | async)!"
        (themeChange)="onTheme($event)"
      ></lbk-navbar>

      <lbk-screen
        [calculation]="calculation"
        [result]="result"
        [effect]="effect"
        class="mt-8"
      ></lbk-screen>

      <lbk-keypads
        [disabledDot]="disabledDot"
        [disabledEqual]="disabledEqual"
        [disabledOperator]="disabledOperator"
        [disabledZero]="disabledZero"
        [disabledDel]="disabledDel"
        [disabledReset]="disabledReset"
        (del)="onDel()"
        (result)="onResult()"
        (key)="onKey($event)"
        (reset)="onReset()"
        class="mt-6"
      ></lbk-keypads>
    </div>
  `,
})
export class CalculatorComponent implements OnInit {
  theme$!: Observable<number>;
  calculation = '';
  result = '';
  effect = false;

  constructor(private readonly _themeService: ThemeService) {
    this.theme$ = this._themeService.theme$;
  }

  ngOnInit(): void {
    this._themeService.loadTheme();
  }

  onTheme(theme: number) {
    this._themeService.setTheme(theme);
  }

  onDel() {
    if (this.calculation.length == 0) return;
    this.calculation = this.calculation.substring(
      0,
      this.calculation.length - 1
    );

    // Double check if the last key is empty
    if (this.calculation.length == 0) {
      this.result = '';
      return;
    }
    this.result = this.compute(this.calculation);
  }

  onResult() {
    this.effect = true;

    setTimeout(() => {
      this.calculation = this.result;
      this.result = '';
      this.effect = false;
    }, 300);
  }

  onKey(value: string) {
    this.calculation += value;
    this.result = this.compute(this.calculation);
  }

  onReset() {
    this.calculation = '';
    this.result = '';
  }

  /**
   * -Try to compute the result of the calculation with N times, when an error occurs it removes the last key and recompute
   * @param value
   * @param n
   * @returns
   * - When n == 0 , return 'Error'
   */
  compute(value: string, n = 5): string {
    if (n == 0) return 'Error';
    try {
      return eval(value).toString() ?? '';
    } catch (error) {
      return this.compute(value.substring(0, value.length - 1), n - 1);
    }
  }

  get disabledDot(): boolean {
    const lastKey = this.lastKey();
    if (!lastKey) return true;
    if (this.isOperator(lastKey)) return true;

    return lastKey === '.';
  }
  get disabledOperator(): boolean {
    const lastKey = this.lastKey();
    if (!lastKey) return true;

    return this.isOperator(lastKey);
  }

  get disabledZero(): boolean {
    const lastKey = this.lastKey();
    return lastKey === '/';
  }

  get disabledEqual(): boolean {
    return !this.lastKey();
  }

  get disabledDel(): boolean {
    return !this.lastKey();
  }

  get disabledReset(): boolean {
    return !this.lastKey();
  }

  private isOperator(key: string): boolean {
    return key == '+' || key == '-' || key == '*' || key == '/';
  }

  private lastKey(): string {
    return this.calculation.charAt(this.calculation.length - 1);
  }

}
