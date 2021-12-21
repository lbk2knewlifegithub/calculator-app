import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-theme-calculator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex gap-4 items-end">
      <p class="tracking-wide font-semibold text-sm">THEME</p>

      <div class="grid place-content-center text-sm">
        <ul class="flex justify-between font-bold px-2">
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>

        <div class="w-[75px] relative h-8 bg-toggle-keypad rounded-full">
          <!-- ball -->
          <div
            class="absolute top-1/2 translate-x-2 -translate-y-1/2 w-[19px] h-[19px] bg-equal-ball shadow-equal-ball rounded-full"
          ></div>
          <!-- end ball -->
        </div>
      </div>
    </div>
  `,
})
export class ThemeComponent {
}
