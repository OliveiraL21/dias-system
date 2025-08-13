import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { TarefaService } from 'src/app/services/tarefas/tarefa.service';
import { ProjetoListagem } from 'src/app/models/projeto/projeto';
import { Tarefa, TarefaListagem } from 'src/app/models/tarefa/tarefa';
import { CustomFilter } from 'src/app/models/customFilter/customFilter';
import { formatDate } from 'date-fns';
import { MensagemService } from 'src/app/services/message/Mensagem.service';
import { Status } from 'src/app/models/status/status';
import { StatusService } from 'src/app/services/status/status.service';



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
  finalizarSplitButtonItems: MenuItem[] = [];
  selectedTarefa: Tarefa | null = null;
  status: Status[] = [];

  constructor(private projetoService: ProjetoService, private service: TarefaService, private messageService: MensagemService, private confirmationService: ConfirmationService, private router: Router, private statusService: StatusService) {
    this.finalizarSplitButtonItems = [
      {
        label: 'Bloquear',
        icon: 'pi pi-lock',
        tooltipOptions: {
          tooltipLabel: 'Bloquear tarefa',
        },
        command: () => {
          this.selectedTarefa!.status = this.setStatus('Bloqueado', this.selectedTarefa!);
          this.updateTarefaStatus(this.selectedTarefa?.id ?? '', this.selectedTarefa!, 'Bloqueada');
        }
      },
      {
        label: 'Inativar',
        tooltipOptions: {
          tooltipLabel: 'Inativar tarefa',
        },
        icon: 'pi pi-ban',
        command: () => {
          this.selectedTarefa!.status = this.setStatus('Inativo', this.selectedTarefa!);
          this.updateTarefaStatus(this.selectedTarefa?.id ?? '', this.selectedTarefa!, 'Inativada');
        }
      },
      {
        label: 'Finalizar',
        icon: 'pi pi-check',
        tooltipOptions: {
          tooltipLabel: 'Finalizar tarefa',
        },
        command: () => {
          this.selectedTarefa!.status = this.setStatus('Finalizado', this.selectedTarefa!);
          console.log(this.selectedTarefa);
          this.updateTarefaStatus(this.selectedTarefa?.id ?? '', this.selectedTarefa!, 'Finalizada');
        }
      }
    ]
  }

  getStatus() {
    this.statusService.listaTodos().subscribe({
      next: (response: Status[]) => {
        this.status = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  setStatus(statusNovo: string, tarefa: Tarefa): Status | null {
    if (statusNovo) {
      let s = this.status.find(s => s.descricao === statusNovo);
      return s ?? tarefa.status;
    }
    return tarefa.status;
  }

  openPopupTarefa(event: MouseEvent, tarefa: Tarefa, menu: any) {
    this.selectedTarefa = tarefa;
    menu.toggle(event);
  }

  updateTarefaStatus(id: string, tarefa: Tarefa, statusMessage: string) {
    this.loading = true;
    this.service.update(id, tarefa).subscribe({
      next: (response: any) => {
        this.messageService.sucesso('Tarefas', `Tarefa ${statusMessage} com sucesso!`);
        this.listarTarefas();
        this.loading = false;
      }, error: (error: any) => {
        this.loading = false;
        this.messageService.erro('Tarefas', `Não foi possível alterar a tarefa, tente novamente mais tarde!`);
      }
    })
  }

  getCustomFilter(): CustomFilter[] {
    return [
      new CustomFilter('descricao', 'text', 'Informe a descrição da tarefa', 'Tarefa'),
      new CustomFilter('dataInicio', 'date', 'Selecione a data inicial', 'Inicio'),
      new CustomFilter('dataFim', 'date', 'Selecione a data fim', 'Fim'),
      new CustomFilter('projetoId', 'dropdown', 'Selecione o projeto', 'Projeto', '', this.projetos, 'id', 'descricao', true),
    ]
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

  deletar(event: Event, id: string) {
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
                this.messageService.sucesso('Excluir Tarefa', 'Tarefa excluido com sucesso!');
                this.listarTarefas();
                this.loading = false;
              } else {
                this.messageService.erro('Excluir Tarefa', 'Não foi possível excluir o Tarefa, tente novamente mais tarde');
                this.loading = false;
              }

            },
            error: (error: any) => {
              this.messageService.erro('Excluir Tarefa', `${error.error.error ? error.error.error : 'Não foi possível excluir o Tarefa, tente novamente mais tarde'}`);
              this.loading = false;
            }
          })
        },
        reject: () => {
          this.messageService.erro('Excluir Tarefa', 'O processo de exclusão foi rejeitado!');
          this.loading = false;
        }
      })


    }
  }

  createDateToRequest(date: any): string | null {
    if (typeof date === 'string') {
      date = new Date(date);
      return formatDate(date, 'yyyy-MM-dd');
    }

    if (date instanceof Date && !isNaN(date.getTime())) {
      return formatDate(date, 'yyyy-MM-dd');
    }

    return null;
  }

  filtrar(data: any) {
    if (data) {
      this.loading = true;

      data.descricao = data.descricao === '' || data.descricao === undefined || data.descricao === null ? null : data.descricao;
      data.projetoId = data.projetoId === null || data.projetoId === undefined ? data.projetoId = "" : data.projetoId;
      data.dataInicio = data.dataInicio === null || data.dataInicio === undefined ? null : this.createDateToRequest(data.dataInicio);
      data.dataFim = data.dataFim === null || data.dataFim === undefined ? null : this.createDateToRequest(data.dataFim);

      if (data.dataInicio && !data.dataFim || !data.dataInicio && data.dataFim) {
        this.messageService.erro('Tarefas', 'É necessário preencher a data inicio e data fim');
        this.loading = false;
        return;
      }

      this.service.filtrar(data.descricao, data.dataInicio, data.dataFim, data.projetoId).subscribe({
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


  ngOnInit() {
    this.listarTarefas();
    this.getProjetos();
    this.getStatus();
  }
}
