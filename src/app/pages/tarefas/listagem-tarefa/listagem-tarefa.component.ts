import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { TarefaService } from 'src/app/services/tarefas/tarefa.service';
import { ProjetoListagem } from 'src/app/models/projeto/projeto';
import { Tarefa, TarefaListagem } from 'src/app/models/tarefa/tarefa';

@Component({
  selector: 'app-listagem-tarefa',
  templateUrl: './listagem-tarefa.component.html',
  styleUrl: './listagem-tarefa.component.css',
  providers: [MessageService, ConfirmationService]
})
export class ListagemTarefaComponent {
  loading: boolean = false;
  tarefas: TarefaListagem[] = [];
  projetos: ProjetoListagem[] = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private projetoService: ProjetoService, private service: TarefaService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router) { }

  show(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message });
  }

  getProjetos() {
    this.projetoService.listaSimples().subscribe({
      next: (response: ProjetoListagem[]) => {
        this.projetos = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  formatTarefasList(tarefas: TarefaListagem[]) {
    this.tarefas = tarefas.map((tarefa: TarefaListagem, index: number) => ({
      id: tarefa.id,
      data: tarefa.data,
      horarioInicio: tarefa.horarioInicio.substring(11, 16),
      horarioFim: tarefa.horarioFim.substring(11, 16),
      duracao: tarefa.duracao.substring(11, 16),
      descricao: tarefa.descricao,
      observacao: tarefa.observacao,
      status: tarefa.status,
      projeto: tarefa.projeto
    }));
  }

  listarTarefas() {
    this.service.listaTodos().subscribe({
      next: (tarefas: TarefaListagem[]) => {
        this.formatTarefasList(tarefas);
      },
    });
  }

  novo() {
    this.router.navigateByUrl('tarefas/cadastro');
  }

  editar(id: number) {
    this.router.navigateByUrl(`tarefas/editar/${id}`)
  }

  deletar(event: Event, id: number) {
    if (event) {
      this.loading = true;
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Deseja realmente excluir este item ? uma vez excluído o registro não podera ser recuperado!',
        header: 'Tarefas',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        acceptButtonStyleClass: "p-button-danger p-button-text",
        rejectButtonStyleClass: "p-button-text p-button-text",
        accept: () => {
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
        },
        reject: () => {
          this.show('error', 'Excluir Tarefa', 'O processo de exclusão foi rejeitado!');
          this.loading = false;
        }
      })


    }
  }

  filtrar() {
    let data = this.form.value;
    if (data) {
      this.loading = true;

      let dataInicio;
      let dataFim;

      if (data?.periodo && data?.periodo[0]) {
        dataInicio = data.periodo[0].toDateString();
      } else {
        dataInicio = null;
      }

      if (data?.periodo && data.periodo[1]) {
        dataFim = data.periodo[1].toDateString();
      } else {
        dataFim = null;
      }

      data.descricao = data.descricao === '' || data.descricao === undefined || data.descricao === null ? null : data.descricao;
      data.projetoId = data.projetoId === null || data.projetoId === undefined ? data.projetoId = 0 : data.projetoId;

      if (dataInicio && !dataFim || !dataInicio && dataFim) {
        this.show('error', 'Tarefas', 'É necessário preencher um periodo de data válido');
        this.loading = false;
        return;
      }

      this.service.filtrar(data.descricao, dataInicio, dataFim, data.projetoId).subscribe({
        next: (response: TarefaListagem[]) => {
          this.formatTarefasList(response);
          this.loading = false;
        },
        error: (error: any) => {
          this.loading = false;
          console.log(error);
        }
      })
    }
  }

  _initForm() {
    this.form = this.fb.group({
      descricao: [null, null],
      periodo: [null, null],
      projetoId: [null, null],
    });
  }

  ngOnInit() {
    this.listarTarefas();
    this.getProjetos();
    this._initForm();
  }
}
