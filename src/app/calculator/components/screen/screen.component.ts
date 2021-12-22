import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { formatNumber } from '@lbk/calculator/utils';
import { calculationAnim, resultAnim } from './screen.anim';

@Component({
  selector: 'lbk-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid py-4 px-4  bg-screen rounded-xl font-bold  tracking-wide">
      <!-- calculation -->
      <input
        [@calculation]="effect ? 'close' : 'open'"
        [value]="formattedCalculation"
        disabled
        class="bg-screen font-bold text-3xl text-right px-2"
        type="text"
      />
      <!-- end calculation -->

      <!-- result -->
      <input
        [@result]="effect ? 'close' : 'open'"
        disabled
        [value]="formattedResult"
        class="bg-screen text-xl text-right leading-[2.25rem] px-2"
        type="text"
      />
      <!-- end result -->
    </div>
  `,
  animations: [calculationAnim, resultAnim],
})
export class ScreenComponent {
  @Input() calculation!: string;
  @Input() result!: string;
  @Input() effect!: boolean;

  get formattedCalculation(): string {
    if (this.calculation.charAt(this.calculation.length - 1) === '.') {
      return this.calculation;
    }

    const operators = this.splitOperators(this.calculation);

    const numbers = this.calculation
      .replace(/[\+\-\*\/]/g, ' ')
      .split(' ')
      .map((x) => formatNumber(x));

    let result = '';
    for (let i = 0; i < numbers.length; i++) {
      const num = numbers[i];
      const operator = operators[i];

      if (operator) {
        result += num + operator;
        continue;
      }
      result += num;
    }

    return result;
  }

  private splitOperators(calculation: string): string[] {
    return calculation
      .split('')
      .filter((x) => ['+', '-', '*', '/'].includes(x));
  }

  get formattedResult(): string {
    if (!this.result) return '';
    // When last key is '.', will return the result
    if (this.result.charAt(this.result.length - 1) === '.') return this.result;
    // return new DecimalPipe(navigator.language).transform(this.result)!;
    return formatNumber(this.result);
  }
}
