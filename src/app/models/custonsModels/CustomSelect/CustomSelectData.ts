export default class CustomSelectData {
  optionLabel: string;
  optionValue: string;
  filter: boolean;
  filterBy: string;
  showClear: boolean;
  placeholder: string;
  controlName: string;
  label: string;
  options: any[] = [];
  required: boolean;

  constructor(optionLabel: string, optionValue: string, filter: boolean, filterBy: string, showClear: boolean, placeholder: string, controlName: string, label: string, options: any[], required: boolean) {
    this.optionLabel = optionLabel;
    this.optionValue = optionValue;
    this.filter = filter;
    this.filterBy = filterBy;
    this.showClear = showClear;
    this.placeholder = placeholder;
    this.controlName = controlName;
    this.label = label;
    this.options = options;
    this.required = required;
  }
}
