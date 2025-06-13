import { Component } from '@angular/core';
import Cliente from '../../models/cliente/cliente';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CustomFilter } from 'src/app/models/customFilter/customFilter';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
  providers: [MessageService, ConfirmationService]
})
export class ClienteComponent {
  clients: Cliente[] = [];
  form!: FormGroup;
  loading: boolean = false

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private messageService: MessageService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.listarClientes();
  }

  getCustomFilter(): CustomFilter[] {
    return [
      new CustomFilter('razaoSocial', 'text', 'Informe a razão social', 'Razão Social'),
      new CustomFilter('cnpj', 'cnpj', '00.000.000/0000-00', 'Cnpj', '99.999.999/9999-99'),
    ]
  }

  filtrar(data: any): void {
    if (data) {
      this.loading = true;
      console.log(data);
      data.cnpj = data.cnpj ? data.cnpj.replace('/', '-') : data.cnpj;
      this.clienteService.filtrar(data.razaoSocial, data.cnpj).subscribe({
        next: (response: Cliente[]) => {
          this.clients = response;
          this.loading = false;
        },
        error: (error: any) => {
          this.loading = false;
        }
      })
    }
  }

  show(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message });
  }

  novoCliente() {
    this.router.navigateByUrl('cliente/cadastro');
  }

  editarCliente(id: number) {
    this.router.navigateByUrl(`cliente/editar/${id}`)
  }

  deletarCliente(event: Event, id: number) {
    if (event) {
      this.loading = true;
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Você tem certeza que deseja excluir este cliente?',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        acceptButtonStyleClass: "p-button-danger p-button-text",
        rejectButtonStyleClass: "p-button-text p-button-text",
        accept: () => {
          this.clienteService.delete(id).subscribe({
            next: (response: any) => {
              if (response) {
                this.show('success', 'Excluir Cliente', 'Cliente excluido com sucesso!');
                this.listarClientes();
                this.loading = false;
              } else {
                this.show('error', 'Excluir Cliente', 'Não foi possível excluir o cliente, tente novamente mais tarde');
                this.loading = false;
              }

            },
            error: (error: any) => {
              this.show('error', 'Excluir Cliente', `${error.error.error ? error.error.error : 'Não foi possível excluir o cliente, tente novamente mais tarde'}`);
              this.loading = false;
            }
          })
        },
        reject: () => {
          this.loading = false;
          this.show('error', 'Excluir Tarefa', 'O processo de exclusão foi rejeitado!');
        }
      });
    }
  }

  listarClientes() {
    this.loading = true;
    this.clienteService.listarTodos().subscribe({
      next: (response: Cliente[]) => {
        this.clients = response.map((cliente: Cliente) => ({
          ...cliente,
          cnpj: cliente.cnpj == '' ? "-" : cliente.cnpj,
          telefone: cliente.telefone == '' ? "-" : cliente.telefone,
        }));
        console.log(this.clients);
        this.loading = false;
      },
      error: (error: any) => {
        this.loading = false;
      }
    })
  }
}
