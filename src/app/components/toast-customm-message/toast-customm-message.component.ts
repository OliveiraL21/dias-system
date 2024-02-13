import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-toast-customm-message',
  templateUrl: './toast-customm-message.component.html',
  styleUrl: './toast-customm-message.component.css',
  providers: [MessageService]
})
export class ToastCustommMessageComponent {
  constructor(private messageService: MessageService) { }

  showMessage(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message });
  }
}
