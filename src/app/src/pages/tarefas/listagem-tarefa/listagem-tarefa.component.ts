import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { TarefaService } from 'src/app/services/tarefas/tarefa.service';
import { Tarefa, TarefaListagem } from 'src/app/src/models/tarefa/tarefa';

@Component({
  selector: 'app-listagem-tarefa',
  templateUrl: './listagem-tarefa.component.html',
  styleUrl: './listagem-tarefa.component.css',
  providers: [MessageService]
})
export class ListagemTarefaComponent {
  loading: boolean = false;
  tarefas: TarefaListagem[] = [];

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private projetoService: ProjetoService, private service: TarefaService, private messageService: MessageService, private router: Router) { }

  show(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message });
  }

  listarTarefas() {
    this.service.listaTodos().subscribe({
      next: (tarefas: TarefaListagem[]) => {
        this.tarefas = tarefas;
        this.tarefas = this.tarefas.map((tarefa: TarefaListagem, index: number) => ({
          id: tarefa.id,
          data: tarefa.data,
          horarioInicio: tarefa.horarioInicio.substring(11, 16),
          horarioFim: tarefa.horarioFim.substring(11, 16),
          duracao: tarefa.duracao.substring(11, 16),
          descricao: tarefa.descricao,
          observacao: tarefa.observacao,
          status: tarefa.status,
          projeto: tarefa.projeto
        }))
        console.log(tarefas);
      },
    });
  }

  novo() {
    this.router.navigateByUrl('tarefas/cadastro');
  }

  editar(id: number) {
    this.router.navigateByUrl(`tarefas/editar/${id}`)
  }

  deletar(id: number) {
    if (id) {
      this.loading = true;
      this.service.excluirTarefa(id).subscribe({
        next: (response: any) => {
          if (response) {
            this.show('success', 'Excluir Tarefa', 'Tarefa excluido com sucesso!');
            this.listarTarefas();
            this.loading = false;
          } else {
            this.show('error', 'Excluir Tarefa', 'Não foi possível excluir o Tarefa, tente novamente mais tarde');
            this.loading = false;
          }

        },
        error: (error: any) => {
          this.show('error', 'Excluir Tarefa', `${error.error.error ? error.error.error : 'Não foi possível excluir o Tarefa, tente novamente mais tarde'}`);
          this.loading = false;
        }
      })
    }
  }

  ngOnInit() {
    this.listarTarefas();
  }
}
