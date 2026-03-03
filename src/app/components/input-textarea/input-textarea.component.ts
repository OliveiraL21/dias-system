import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomTextareaData } from 'src/app/models/custonsModels/CustomTextarea/CustomTextareaData';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.css']
})
export class InputTextareaComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() control!: CustomTextareaData;
  constructor() { }

  ngOnInit() {
  }

}
