import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomPassword } from '../../models/custonsModels/CustomPasswordData/CustomPassword';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss'
})
export class InputPasswordComponent {
  @Input() form!: FormGroup;
  @Input() controlData!: CustomPassword;
}
