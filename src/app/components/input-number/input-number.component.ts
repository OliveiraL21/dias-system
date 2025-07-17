import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import CustomInputNumberData from '../../models/custonsModels/customInputNumberData/CustomInputNumberData';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss'
})
export class InputNumberComponent {
  @Input() form!: FormGroup;
  @Input() controlData!: CustomInputNumberData;
}
