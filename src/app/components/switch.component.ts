import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'awesome-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AwesomeSwitchComponent),
      multi: true,
    },
  ],
})
export class AwesomeSwitchComponent implements ControlValueAccessor {
  @Input() value = false;
  @Output() valueChange = new EventEmitter<boolean>();

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('readOnly') controlValueAccessorDisabled = false;
  private controlValueAccessorOnChange: (value: boolean) => void;
  private controlValueAccessorOnTouched: () => void;

  @ViewChild('inputElement') inputElement: ElementRef;

  @HostListener('keydown.spacebar') handleSpace() {
    this.updateValue();
  }

  @HostListener('click') handleClick() {
    this.updateValue();
  }

  constructor(private cdr: ChangeDetectorRef) {}

  private updateValue() {
    if (this.controlValueAccessorDisabled) {
      return;
    }
    this.value = !this.value;
    this.valueChange.next(this.value);

    if (this.controlValueAccessorOnChange) {
      this.controlValueAccessorOnChange(this.value);
    }

    if (this.controlValueAccessorOnTouched) {
      this.controlValueAccessorOnTouched();
    }
  }

  public focus() {
    this.inputElement.nativeElement.focus();
  }

  // Control value accessor - start
  registerOnChange(fn: any): void {
    this.controlValueAccessorOnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.controlValueAccessorOnTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.controlValueAccessorDisabled = isDisabled;
    this.cdr.markForCheck();
  }

  writeValue(value: boolean): void {
    this.value = value;
    this.cdr.markForCheck();
  }
  // Control value accessor - end
}
