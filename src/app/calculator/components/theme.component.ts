import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'lbk-theme-calculator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex gap-4 items-end">
      <p class="tracking-wide font-semibold text-sm">THEME</p>

      <div class="grid place-content-center text-sm">
        <div class="flex justify-between font-bold px-2">
          <button class="hover:font-black" (click)="onTheme(0)">1</button>
          <button class="hover:font-black" (click)="onTheme(1)">2</button>
          <button class="hover:font-black" (click)="onTheme(2)">3</button>
        </div>

        <button
          (click)="onTheme()"
          class="w-[75px] relative h-8 bg-toggle-keypad rounded-full"
        >
          <!-- ball -->
          <div
            [style.transform]="translate"
            class="absolute top-1/2 translate-x-2 -translate-y-1/2 w-[19px] h-[19px] bg-equal-ball shadow-lg shadow-ball rounded-full duration-300"
          ></div>
          <!-- end ball -->
        </button>
      </div>
    </div>
  `,
})
export class ThemeComponent {
  @Output() themeChange = new EventEmitter<number>();
  @Input() theme = 2;

  get translate() {
    return `translate(${this.theme *  23 + 5}px, -50%)`;
  }

  onTheme(theme?: number) {
    if (theme) return this.themeChange.emit(theme);

    this.themeChange.emit((this.theme + 1) % 3);
  }
}
