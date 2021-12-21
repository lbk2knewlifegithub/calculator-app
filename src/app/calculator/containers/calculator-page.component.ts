import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-calculator-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="container mt-10">
      <lbk-calculator></lbk-calculator>
    </main>
  `,
})
export class CalculatorPageComponent {}
