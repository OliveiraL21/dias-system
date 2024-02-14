import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFilter } from 'src/app/models/customFilter/customFilter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Input() formControls?: CustomFilter[] = [];

  @Output() filtrarChange: EventEmitter<any> = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  trackByFn(index: any, item: any) {
    return index;
  }

  ngOnInit() {
    this.form = this.fb.group({});
    if (this.formControls && this.formControls.length > 0) {
      this.formControls.forEach((item: CustomFilter) => {
        if (item.type === 'email') {
          this.form.addControl(item.name, this.fb.control(null, [Validators.email]));
        } else {
          this.form.addControl(item.name, this.fb.control(null, null))
        }
      });
    }
  }

  filtrar() {
    let data = this.form.value;
    if (data) {
      Object.keys(data).forEach((key: any) => {
        data[key] = typeof data[key] !== 'number' && (data[key] === '' || data[key] === null || data[key] === undefined) ? null : data[key];
        data[key] = typeof data[key] === 'number' && (data[key] === undefined || data[key] === null) ? 0 : data[key];
      });
      this.filtrarChange.emit(data);
    }
  }
}
