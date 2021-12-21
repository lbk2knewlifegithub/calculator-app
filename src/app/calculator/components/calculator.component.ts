import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-calculator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <lbk-navbar-calculator></lbk-navbar-calculator> `,
})
export class CalculatorComponent {}
