import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  CustomAnimation,
  DefaultCustomAnimation
} from '@lbk/calculator/models';

export function scaleIn(option?: CustomAnimation) {
  option = { ...DefaultCustomAnimation, ...option };
  const { name, delay, duration, timing } = option;
  return trigger(name || 'scaleIn', [
    state('void', style({ opacity: 0.6, transform: 'scale(0.1)' })),
    transition(':enter', [animate('{{duration}}ms {{delay}}ms {{timing}}')], {
      params: { delay, timing, duration },
    }),
  ]);
}
