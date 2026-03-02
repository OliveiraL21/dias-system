export default class CustomInputNumberData {
  controlName: string;
  label: string;
  forLabel: string;
  mode: string;
  required: boolean;
  visible: boolean;
  grouping: boolean;
  suffix: string;

  constructor(controlName: string, label: string, forLabel: string, mode: string, required: boolean, visible: boolean = true, grouping = true, suffix: string = '') {
    this.controlName = controlName;
    this.label = label;
    this.forLabel = forLabel;
    this.mode = mode;
    this.required = required;
    this.visible = visible;
    this.grouping = grouping;
    this.suffix = suffix;
  }
}
