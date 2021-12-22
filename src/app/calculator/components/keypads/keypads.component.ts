import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'lbk-keypads',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './keypads.component.html',
  styleUrls: ['./keypads.component.scss'],
})
export class KeypadsComponent {
  @Output() del = new EventEmitter<void>();
  @Output() result = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  @Output() key = new EventEmitter<string>();

  @Input() disabledOperator = false;
  @Input() disabledDot = false;
  @Input() disabledEqual = false;
  @Input() disabledZero = false;
  @Input() disabledDel = false;
  @Input() disabledReset = false;
  @Input() disabledOneToNine = false;

  onKey(event: Event) {
    const target = event.target as HTMLElement;
    const value = target.innerText.toLowerCase();

    if (value === 'del') return this.del.emit();
    if (value === 'reset') return this.reset.emit();
    if (value === '=') return this.result.emit();

    this.key.emit(value);
  }
}
