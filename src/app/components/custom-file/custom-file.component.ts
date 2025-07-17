import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Utils } from '../../common/helpers/utils/utils';

@Component({
  selector: 'app-custom-file',
  templateUrl: './custom-file.component.html',
  styleUrl: './custom-file.component.scss'
})
export class CustomFileComponent {
  files: any[] = [];

  @Input() set FileInput(file: any) {
    this.files = [file];
  }
  @Output() FileEventEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {

  }

  async upload(event: any) {
    if (event.currentFiles) {
      this.files = [event.currentFiles[0]];
      let base64 = await Utils.convertToBase64(this.files[0]);
      this.FileEventEmitter.emit(base64);
    }
  }

  clear() {
    this.files = [];
    this.FileEventEmitter.emit(this.files[0]);
  }
}
