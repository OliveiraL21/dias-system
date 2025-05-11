import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private messageService: MessageService) { }

  sucesso(titulo: string, detalhe: string, tempo = 4000) {
    this.messageService.add({
      severity: 'success',
      summary: titulo,
      detail: detalhe,
      life: tempo
    });
  }

  erro(titulo: string, detalhe: string, tempo = 5000) {
    this.messageService.add({
      severity: 'error',
      summary: titulo,
      detail: detalhe,
      life: tempo
    });
  }

  aviso(titulo: string, detalhe: string, tempo = 4000) {
    this.messageService.add({
      severity: 'warn',
      summary: titulo,
      detail: detalhe,
      life: tempo
    });
  }

  info(titulo: string, detalhe: string, tempo = 4000) {
    this.messageService.add({
      severity: 'info',
      summary: titulo,
      detail: detalhe,
      life: tempo
    });
  }

  limpar() {
    this.messageService.clear();
  }

}
