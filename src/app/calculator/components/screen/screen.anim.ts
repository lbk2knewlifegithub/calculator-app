import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const calculationAnim = trigger('calculation', [
  state('open', style({})),
  state(
    'close',
    style({
      opacity: 0,
      transform: 'scale(0)',
    })
  ),
  transition('open => close', [animate('300ms ease-in-out')]),
]);

export const resultAnim = trigger('result', [
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
]);
