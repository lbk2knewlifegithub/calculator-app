import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-calculator-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <lbk-calculator></lbk-calculator> `,
})
export class CalculatorPageComponent {}
