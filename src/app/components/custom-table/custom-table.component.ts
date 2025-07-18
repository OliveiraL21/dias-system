import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CustomButton } from '../../models/custonsModels/CustomButtonData/CustomButton';
import { ConfirmationService, MessageService } from 'primeng/api';
import Column from '../../models/custonsModels/CustomTable/CustomColumn';

export enum Severity {
  Success = 'success',
  Info = 'info',
  Warn = 'warn',
  Danger = 'danger',
  Secundary = 'secundary',
  Contrast = 'contrast',
}

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss'
})

export class CustomTableComponent {
  @Input() pageTitle: string = "";
  @Input() listOfColumns: Column[] = [];
  @Input() listData: any[] = [];
  @Input() addRoute: string = "";
  @Input() editRoute: string = "";
  @Input() pageName: string = "";
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>();
  loading: boolean = false;




  constructor(private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  trackByFn(index: any, item: any) {
    return index;
  }

  teste() {
    console.log('click');
  }

  editar(id: string) {
    this.router.navigateByUrl(`${this.editRoute}/${id}`);
  }

  showMessage(type: string, title: string, message: string) {
    this.messageService.add({
      severity: type,
      summary: title,
      detail: message,
      key: 'trCustom',
      life: 1000,
    })
  }

  openDialog(event: MouseEvent, id: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja excluir este item?',
      header: 'Confirmação de exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.loading = true;
        this.deletar(id);

      },
      reject: () => {

      }
    })
  }



  deletar(id: string) {
    this.deleteEvent.emit(id);
  }
  novo() {
    this.router.navigateByUrl(this.addRoute);
  }
  getCustomButton(): CustomButton {
    return new CustomButton(`Novo ${this.pageName}`, false, "bg-indigo-600", "primary", "pi pi-plus");
  }

  generateStatusSeverity(data: any, field: any) {
    return "success";
  }

  generateTableValues(data: any, field: any): any {
    if (data) {
      if (field.includes('valor') || field.includes('total') || field.includes('subTotal') || field.includes('desconto')) {
        return data[field].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
      }

      if (field.includes('data')) {
        return data[field];
      }

      if (field.includes('$')) {
        let keys = field.split('$');
        return data[keys[0]][keys[1]];
      }

      return data[field];
    }
  }

}
