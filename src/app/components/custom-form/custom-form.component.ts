import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomFormControls } from '../../models/custonsModels/CustomFormData/CustomFormControls';
import { CustomButton } from '../../models/custonsModels/CustomButtonData/CustomButton';
import { Utils } from 'src/app/common/helpers/utils/utils';
import { MensagemService } from 'src/app/services/message/Mensagem.service';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.scss',
})
export class CustomFormComponent {
  @Input() form!: FormGroup;
  @Input() controls?: CustomFormControls[];
  @Input() file?: any;
  @Input() formButtonsVisible: boolean = true;
  @Output() FileEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() SubmitEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() BackEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private messageService: MensagemService) {

  }


  getCustomButton(label: string, rounded: boolean, styles: string, severity: string): CustomButton {
    return new CustomButton(label, rounded, styles, severity, "");
  }

  voltar() {
    this.BackEvent.emit();
  }

  submit() {
    if (this.form.valid) {
      this.SubmitEvent.emit(this.form.value);
    } else {
      Utils.getRequiredFieldsInvalid(this.form);
      this.messageService.erro('Error', 'Por favor preencha todos os campos obrigatórios!');
    }

  }

  trackByFn(index: any, item: any) {
    return index;
  }

  fileChange(fileBase64: string) {
    this.FileEvent.emit(fileBase64);
  }


}
