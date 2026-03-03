export class CustomTextareaData {
  controlName: string;
  rows: string;
  cols: string;
  id: string;
  label: string;

  constructor(controlName: string, rows: string = "5", cols: string = "30", id: string, label: string) {
    this.controlName = controlName;
    this.rows = rows;
    this.cols = cols;
    this.id = id;
    this.label = label;
  }
}
