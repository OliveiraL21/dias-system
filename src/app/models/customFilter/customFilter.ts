export class CustomFilter {
  name: string = '';
  type: string = 'text';
  placeholder: string = '';
  label: string = '';
  mask?: string;
  dropdownList: any[] = [];
  dropdownValue: string = '';
  dropdownLabel: string = '';
  dropdownShowClear: boolean = false;
  dateInputMode: string = '';

  constructor(name: string, type: string, placeholder: string, label: string, mascara: string = '', dropdownList: any[] = [], dropdownValue: string = '', dropdownLabel: string = '', showClearDropdown: boolean = false, dateInputMode: string = '') {
    this.name = name;
    this.type = type;
    this.label = label;
    this.placeholder = placeholder;
    this.mask = mascara;
    this.dropdownList = dropdownList;
    this.dropdownLabel = dropdownLabel;
    this.dropdownValue = dropdownValue;
    this.dropdownShowClear = showClearDropdown;
    this.dateInputMode = dateInputMode;
  }
}
