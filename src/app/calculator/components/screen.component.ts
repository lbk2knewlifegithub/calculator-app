import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'lbk-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid py-4 px-6  bg-screen rounded-xl font-bold  tracking-wide">
      <!-- calculation -->
      <input
        [@calculation]="effect ? 'close' : 'open'"
        [value]="formattedCalculation"
        disabled
        class="bg-screen font-bold text-3xl text-right "
        type="text"
      />
      <!-- end calculation -->

      <!-- result -->
      <input
        [@result]="effect ? 'close' : 'open'"
        disabled
        [value]="result | number"
        class="bg-screen text-xl text-right leading-[2.25rem]"
        type="text"
      />
      <!-- end result -->
    </div>
  `,
  animations: [
    trigger('calculation', [
      state('open', style({})),
      state(
        'close',
        style({
          opacity: 0,
          transform: 'scale(0)',
        })
      ),

      transition('open => close', [animate('300ms ease-in-out')]),
    ]),

    trigger('result', [
      state('open', style({})),
      state(
        'close',
        style({
          transform: 'translateY(-100%)',
          fontWeight: 700,
          fontSize: '1.875rem',
        })
      ),

      transition('open => close', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class ScreenComponent implements OnInit {
  @Input() calculation!: string;
  @Input() result!: string;
  @Input() effect!: boolean;

  constructor() {}

  ngOnInit(): void {
  }

  get formattedCalculation(): string {
    const operators = this.splitOperators(this.calculation);

    const numbers = this.calculation
      .replace(/[\+\-\*\/]/g, ' ')
      .split(' ')
      .map((x) => new DecimalPipe(navigator.language).transform(x) ?? '');

    console.log(operators);

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
    console.log(result);

    return result;
  }

  private splitOperators(calculation: string): string[] {
    return calculation
      .split('')
      .filter((x) => ['+', '-', '*', '/'].includes(x));
  }
}
