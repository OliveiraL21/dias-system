import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { Projeto, ProjetoListagem } from 'src/app/models/projeto/projeto';
import { CustomFilter } from 'src/app/models/customFilter/customFilter';
import Cliente from 'src/app/models/cliente/cliente';
import { Status } from 'src/app/models/status/status';
import { StatusService } from 'src/app/services/status/status.service';
import { MensagemService } from 'src/app/services/message/Mensagem.service';

@Component({
  selector: 'app-listagem-projeto',
  templateUrl: './listagem-projeto.component.html',
  styleUrl: './listagem-projeto.component.css',
  providers: [MessageService, ConfirmationService]
})
export class ListagemProjetoComponent {
  form!: FormGroup;
  loading: boolean = false;
  projetos: ProjetoListagem[] = [];
  comboProjeto: Projeto[] = [];
  clientes: Cliente[] = [];
  status: Status[] = [];

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private statusService: StatusService, private service: ProjetoService, private messageService: MensagemService, private router: Router, private confirmationService: ConfirmationService) { }


  getCustomFilter(): CustomFilter[] {
    return [
      new CustomFilter('projeto', 'dropdown', 'Selecione o projeto', 'Projeto', '', this.projetos, 'id', 'descricao', true),
      new CustomFilter('cliente', 'dropdown', 'Selecione o cliente', 'Cliente', '', this.clientes, 'id', 'razaoSocial', true),
      new CustomFilter('status', 'dropdown', 'Selecione o status', 'Status', '', this.status, 'id', 'descricao', true)
    ]
  }

  getListSimpleProjeto() {
    this.service.listaSimples().subscribe({
      next: (response: any[]) => {
        this.comboProjeto = response;
      }
    });
  }

  getProjetos() {
    this.service.listaTodos().subscribe({
      next: (response: ProjetoListagem[]) => {
        this.projetos = response;
        this.loading = false;
      },
      error: (error: any) => {
        this.loading = false;
      }
    })
  }

  getStatus() {
    this.statusService.listaTodos().subscribe({
      next: (response: Status[]) => {
        this.status = response;
      }
    })
  }

  getClientes() {
    this.clienteService.listaSimples().subscribe({
      next: (response: Cliente[]) => {
        this.clientes = response;
      }
    })
  }

  novo() {
    this.router.navigateByUrl('projeto/cadastro');
  }

  editar(id: number) {
    this.router.navigateByUrl(`projeto/editar/${id}`)
  }

  filtrar(data: any) {
    if (data) {
      this.loading = true;
      data.projeto = data.projeto == undefined || data.projeto == null ? "" : data.projeto;
      data.cliente = data.cliente == undefined || data.cliente == null ? "" : data.cliente;
      data.status = data.status == undefined || data.status == null ? "" : data.status;

      this.service.filtrar(data.projeto, data.cliente, data.status).subscribe({
        next: (response: ProjetoListagem[]) => {
          this.loading = false;
          this.projetos = response;
        },
        error: (error: any) => {
          this.loading = false;
        }
      })
    }
  }

  deletar(event: Event, id: string) {
    if (id) {
      this.loading = true;
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Você tem certeza que deseja excluir este projeto?',
        header: 'Projeto',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        acceptButtonStyleClass: "p-button-danger p-button-text",
        rejectButtonStyleClass: "p-button-text p-button-text",
        accept: () => {
          this.service.delete(id).subscribe({
            next: (response: any) => {
              if (response) {
                this.messageService.sucesso('Excluir Projeto', 'Projeto excluido com sucesso!');
                this.getProjetos();
                this.loading = false;
              } else {
                this.messageService.erro('Excluir Projeto', 'Não foi possível excluir o projeto, tente novamente mais tarde');
                this.loading = false;
              }

            },
            error: (error: any) => {
              this.messageService.erro('Excluir Projeto', `${error.error.error ? error.error.error : 'Não foi possível excluir o projeto, tente novamente mais tarde'}`);
              this.loading = false;
            }
          })
        },
        reject: () => {
          this.loading = false;
        }
      });
    }
  }

  ngOnInit() {
    this.getProjetos();
    this.getClientes();
    this.getStatus();
  }
}
