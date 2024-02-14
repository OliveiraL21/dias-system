import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { Projeto, ProjetoListagem } from 'src/app/models/projeto/projeto';
import { CustomFilter } from 'src/app/models/customFilter/customFilter';
import Cliente from 'src/app/models/cliente/cliente';
import { Status } from 'src/app/models/status/status';
import { StatusService } from 'src/app/services/status/status.service';

@Component({
  selector: 'app-listagem-projeto',
  templateUrl: './listagem-projeto.component.html',
  styleUrl: './listagem-projeto.component.css',
  providers: [MessageService]
})
export class ListagemProjetoComponent {
  form!: FormGroup;
  loading: boolean = false;
  projetos: ProjetoListagem[] = [];
  comboProjeto: Projeto[] = [];
  clientes: Cliente[] = [];
  status: Status[] = [];

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private statusService: StatusService, private service: ProjetoService, private messageService: MessageService, private router: Router) { }

  show(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message });
  }

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
      data.projeto = data.projeto == undefined || data.projeto == null ? 0 : data.projeto;
      data.cliente = data.cliente == undefined || data.cliente == null ? 0 : data.cliente;
      data.status = data.status == undefined || data.status == null ? 0 : data.status;

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

  deletar(id: number) {
    if (id) {
      this.loading = true;
      this.service.delete(id).subscribe({
        next: (response: any) => {
          if (response) {
            this.show('success', 'Excluir Projeto', 'Projeto excluido com sucesso!');
            this.getProjetos();
            this.loading = false;
          } else {
            this.show('error', 'Excluir Projeto', 'Não foi possível excluir o projeto, tente novamente mais tarde');
            this.loading = false;
          }

        },
        error: (error: any) => {
          this.show('error', 'Excluir Projeto', `${error.error.error ? error.error.error : 'Não foi possível excluir o projeto, tente novamente mais tarde'}`);
          this.loading = false;
        }
      })
    }
  }

  ngOnInit() {
    this.getProjetos();
    this.getClientes();
    this.getStatus();
  }
}
