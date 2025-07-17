import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomFormControls } from '../../models/custonsModels/CustomFormData/CustomFormControls';
import { CustomButton } from '../../models/custonsModels/CustomButtonData/CustomButton';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.scss'
})
export class CustomFormComponent {
  @Input() form!: FormGroup;
  @Input() controls?: CustomFormControls[];
  @Input() file?: any;
  @Output() FileEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() SubmitEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() BackEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {

  }


  getCustomButton(label: string, rounded: boolean, styles: string, severity: string): CustomButton {
    return new CustomButton(label, rounded, styles, severity, "");
  }

  voltar() {
    this.BackEvent.emit();
  }

  submit() {
    this.SubmitEvent.emit();
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  fileChange(fileBase64: string) {
    this.FileEvent.emit(fileBase64);
  }


}
