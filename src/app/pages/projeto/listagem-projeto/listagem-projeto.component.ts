import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { Projeto, ProjetoListagem } from 'src/app/models/projeto/projeto';

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

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private service: ProjetoService, private messageService: MessageService, private router: Router) { }

  show(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message });
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

  novo() {
    this.router.navigateByUrl('projeto/cadastro');
  }

  editar(id: number) {
    this.router.navigateByUrl(`projeto/editar/${id}`)
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
  }
}
