import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { formatNumber } from '@lbk/calculator/utils';
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
        [effect]="effectCompute"
        class="mt-8"
      ></lbk-screen>

      <lbk-keypads
        [disabledDot]="disabledDot"
        [disabledEqual]="disabledEqual"
        [disabledOperator]="disabledOperator"
        [disabledZero]="disabledZero"
        [disabledOneToNine]="disabledOneToNine"
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
  effectCompute = false;
  effectUndo = false;
  // Only undo the last calculation
  history?: string;

  constructor(
    private readonly _themeService: ThemeService,
    private cd: ChangeDetectorRef
  ) {
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

    if (this.result == '' && !!this.history) {
      this.result = this.calculation;
      this.calculation = this.history;
      this.result = this.compute(this.calculation);
      this.history = '';
      return;
    }

    this.result = this.compute(this.calculation);
  }

  onResult() {
    this.effectCompute = true;
    setTimeout(() => {
      this.history = this.calculation;
      this.calculation = formatNumber(this.result);
      this.result = '';
      this.effectCompute = false;
      this.cd.detectChanges();
    }, 300);
  }

  onKey(value: string) {
    this.calculation += value;

    // When last key is dot will append value to result not compute
    if (this.lastKey() === '.') {
      this.result = this.calculation;
      return;
    }

    this.result = this.compute(this.calculation);
  }

  onReset() {
    this.calculation = '';
    this.result = '';
    this.history = '';
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
    if (lastKey === '.') return true;
    if (!this.isValid(this.calculation + '.')) return true;
    return false;
  }

  isValid(value: string): boolean {
    try {
      eval(value);
      return true;
    } catch {
      return false;
    }
  }

  get disabledOperator(): boolean {
    const lastKey = this.lastKey();
    if (!lastKey) return true;
    if (lastKey === '.') return true;

    return this.isOperator(lastKey);
  }

  get disabledZero(): boolean {
    const lastKey = this.lastKey();
    if (lastKey === '0' && this.calculation.length === 1) return true;
    if (lastKey === '/') return true;
    return false;
  }

  get disabledEqual(): boolean {
    const lastKey = this.lastKey();
    if (lastKey === '.') return true;
    if (this.isOperator(lastKey)) return true;

    return !lastKey;
  }

  get disabledDel(): boolean {
    return !this.lastKey();
  }

  get disabledReset(): boolean {
    return !this.lastKey();
  }

  get disabledOneToNine(): boolean {
    const lastKey = this.lastKey();
    return lastKey === '0' && this.calculation.length === 1;
  }

  private isOperator(key: string): boolean {
    return key == '+' || key == '-' || key == '*' || key == '/';
  }

  private lastKey(): string {
    return this.calculation.charAt(this.calculation.length - 1);
  }
}
