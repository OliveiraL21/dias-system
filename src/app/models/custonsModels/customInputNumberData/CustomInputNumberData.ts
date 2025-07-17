export default class CustomInputNumberData {
  controlName: string;
  label: string;
  forLabel: string;
  mode: string;
  required: boolean;

  constructor(controlName: string, label: string, forLabel: string, mode: string, required: boolean) {
    this.controlName = controlName;
    this.label = label;
    this.forLabel = forLabel;
    this.mode = mode;
    this.required = required;
  }
}
