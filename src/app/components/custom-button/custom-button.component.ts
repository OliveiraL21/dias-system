import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomButton } from '../../models/custonsModels/CustomButtonData/CustomButton';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {
  @Input() custom!: CustomButton;
  @Output() onClickEvent: EventEmitter<any> = new EventEmitter();

  click() {
    this.onClickEvent.emit();
  }
}
