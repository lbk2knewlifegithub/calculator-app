import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalculatorRoutingModule } from './calculator-routing.module';
import {
  CalculatorComponent,
  KeypadsComponent,
  NavbarComponent,
  ScreenComponent,
  ThemeComponent
} from './components';
import { CalculatorPageComponent } from './containers';

const COMPONENTS = [
  CalculatorComponent,
  NavbarComponent,
  ThemeComponent,
  ScreenComponent,
  KeypadsComponent
];
const CONTAINERS = [CalculatorPageComponent];

@NgModule({
  imports: [CommonModule, CalculatorRoutingModule],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CalculatorModule {}
