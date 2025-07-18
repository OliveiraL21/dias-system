export class CustomInputText {
  controlName: string;
  placeholder: string;
  id: string;
  label: string;
  forLabel: string;
  disabled: boolean;
  required: boolean;
  mask: string;
  visible: boolean;

  constructor(controlName: string, placeholder: string, idName: string, label: string, forLabel: string, disabled: boolean, required: boolean, mask: string, visible: boolean = true) {
    this.controlName = controlName;
    this.placeholder = placeholder;
    this.id = idName;
    this.label = label;
    this.forLabel = forLabel;
    this.disabled = disabled;
    this.required = required;
    this.mask = mask;
    this.visible = visible;
  }
}
