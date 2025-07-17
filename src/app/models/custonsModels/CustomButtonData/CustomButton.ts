export class CustomButton {
  label: string;
  rounded: boolean;
  severity: string;
  stylesClasses: string;
  icon: string;
  tooltip: string;


  constructor(label: string, rounded: boolean, styles: string, severity: string, icon: string, tootip: string = "") {
    this.label = label;
    this.rounded = rounded;
    this.stylesClasses = styles;
    this.severity = severity;
    this.icon = icon;
    this.tooltip = tootip;
  }
}
