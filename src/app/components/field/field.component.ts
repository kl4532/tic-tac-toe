import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldComponent),
      multi: true
    }
  ]
})
export class FieldComponent implements OnInit, ControlValueAccessor {
  @Output() changeMark = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  onChange: any = () => {}
  onTouch: any = () => {}
  val: number | undefined
  set value(val: number){  // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    if(!this.val) {
      this.val = val
      this.onChange(val)
      this.onTouch(val)
      this.changeMark.emit(val);
    }
  }
  // this method sets the value programmatically
  writeValue(value: number){
    if(!this.val) {
      this.value = value
    }
  }
  // upon UI element value changes, this method gets triggered
  registerOnChange(fn: any){
    this.onChange = fn
  }
  // upon touching the element, this method gets triggered
  registerOnTouched(fn: any){
    this.onTouch = fn
  }

}
