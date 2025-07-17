export default class Column {
  field: string;
  header: string;
  filter: boolean;


  constructor(field: string, header: string, filter: boolean = false) {
    this.field = field;
    this.header = header;
    this.filter = filter;
  }
}
