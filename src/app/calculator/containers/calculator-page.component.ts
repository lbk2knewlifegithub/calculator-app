import { ChangeDetectionStrategy, Component } from '@angular/core';
import { scaleIn } from '../animations';

@Component({
  selector: 'lbk-calculator-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main
      class="container py-10 sm:py-20 lg:p-0 lg:h-screen lg:grid lg:place-content-center"
    >
      <lbk-calculator @scaleIn class="mx-auto block max-w-lg"></lbk-calculator>
    </main>
  `,
  animations: [scaleIn()],
})
export class CalculatorPageComponent {}
