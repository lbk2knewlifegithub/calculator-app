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
  template: `
    <div class="grid gap-4 p-6 grid-cols-4 bg-toggle-keypad rounded-xl">
      <!-- row 1 -->
      <button (click)="onKey($event)" class="key">7</button>
      <button (click)="onKey($event)" class="key">8</button>
      <button (click)="onKey($event)" class="key">9</button>
      <button [disabled]="disabledDel" (click)="onKey($event)" class="key del">DEL</button>
      <!-- end row 1 -->

      <!-- row 2 -->
      <button (click)="onKey($event)" class="key">4</button>
      <button (click)="onKey($event)" class="key">5</button>
      <button (click)="onKey($event)" class="key">6</button>
      <button [disabled]="disabledOperator" (click)="onKey($event)" class="key">
        +
      </button>
      <!-- end row 2 -->

      <!-- row 3 -->
      <button (click)="onKey($event)" class="key">1</button>
      <button (click)="onKey($event)" class="key">2</button>
      <button (click)="onKey($event)" class="key">3</button>
      <button [disabled]="disabledOperator" (click)="onKey($event)" class="key">
        -
      </button>
      <!-- end row 3 -->

      <!-- row 4 -->
      <button [disabled]="disabledDot" (click)="onKey($event)" class="key">
        .
      </button>
      <button [disabled]="disabledZero" (click)="onKey($event)" class="key">
        <p class="scale-125 font-bold">0</p>
      </button>
      <button [disabled]="disabledOperator" (click)="onKey($event)" class="key">
        /
      </button>
      <button [disabled]="disabledOperator" (click)="onKey($event)" class="key">
        *
      </button>
      <!-- end row 4 -->

      <!-- row 5 -->
      <button [disabled]="disabledReset" (click)="onKey($event)" class="key del col-span-2">RESET</button>

      <!-- equal button -->
      <button
        [disabled]="disabledEqual"
        (click)="onKey($event)"
        class="key equal col-span-2 "
      >
        =
      </button>
      <!-- end equal button -->
      <!-- end row 45-->
    </div>
  `,
  styles: [
    `
      .key {
        @apply text-key bg-key p-4 text-2xl font-black rounded-lg shadow-key tracking-wider disabled:opacity-30 ;
      }

      .del {
        @apply text-key-accent bg-delete-reset text-base shadow-delete-reset font-bold;
      }

      .equal {
        @apply text-key-equal bg-equal-ball shadow-equal font-bold text-base;
      }
    `,
  ],
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

  onKey(event: Event) {
    const target = event.target as HTMLElement;
    const value = target.innerText.toLowerCase();

    if (value === 'del') return this.del.emit();
    if (value === 'reset') return this.reset.emit();
    if (value === '=') return this.result.emit();

    this.key.emit(value);
  }
}
