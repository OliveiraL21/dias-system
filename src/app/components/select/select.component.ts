import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import CustomSelectData from '../../models/custonsModels/CustomSelect/CustomSelectData';
import { DropdownFilterOptions } from 'primeng/dropdown';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() form!: FormGroup;
  @Input() data!: CustomSelectData;
  @Output() selectCustomValueChangeEvent: EventEmitter<any> = new EventEmitter<any>();

  filterValue: string | undefined = '';

  resetFunction(options: any[]) {
    this.filterValue = '';
  }

  customFilterFunction(event: KeyboardEvent, options: any) {
    options.filter(event);
  }

  selectChangeValue(value: any) {
    this.selectCustomValueChangeEvent.emit(value);
  }

}
