import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-navbar-calculator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="flex justify-between items-center">
      <!-- logo -->
      <h1 class="font-bold tracking-wider text-4xl" routerLink="/">calc</h1>
      <!-- end logo -->

      <!-- theme -->
      <lbk-theme-calculator></lbk-theme-calculator>
      <!-- end theme -->
    </nav>
  `,
})
export class NavbarComponent {}
