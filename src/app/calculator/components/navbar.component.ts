import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'lbk-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="flex justify-between items-center">
      <!-- logo -->
      <h1 class="font-bold tracking-wider text-4xl" routerLink="/">calc</h1>
      <!-- end logo -->

      <!-- theme -->
      <lbk-theme-calculator
        [theme]="theme"
        (themeChange)="themeChange.emit($event)"
      ></lbk-theme-calculator>
      <!-- end theme -->
    </nav>
  `,
})
export class NavbarComponent {
  @Output() themeChange = new EventEmitter<number>();
  @Input() theme!: number;
}
