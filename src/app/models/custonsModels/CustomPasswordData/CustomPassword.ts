export class CustomPassword {
  controlName: string;
  forLabel: string;
  feedback: boolean;
  label: string;
  required: boolean;


  constructor(controlName: string, forLabel: string, feedBack: boolean, label: string, required: boolean) {
    this.controlName = controlName;
    this.forLabel = forLabel;
    this.feedback = feedBack;
    this.label = label;
    this.required = required;
  }
}
