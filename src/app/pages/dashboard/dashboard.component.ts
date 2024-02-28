import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Projeto, ProjetoListagem } from 'src/app/models/projeto/projeto';
import { Tarefa } from 'src/app/models/tarefa/tarefa';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { TarefaService } from 'src/app/services/tarefas/tarefa.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [MessageService]
})
export class DashboardComponent {

  loading: boolean = false;
  projetosAtivos: number = 0;
  horasSemana: number = 0;
  basicData: any;
  basicOptions: any;
  projetos: ProjetoListagem[] = [];
  projeto!: Projeto;
  tarefas!: any;

  constructor(private messageService: MessageService, private projetoService: ProjetoService, private tarefasService: TarefaService, private service: DashboardService) {
    this.getDados()
    this.getProjetos();
  }

  getDados() {
    this.service.carregarDados().subscribe({
      next: (response) => {
        this.projetosAtivos = response.projetosAtivos;
      }
    })
  }

  getProjetos() {
    this.projetoService.listaSimples().subscribe({
      next: (response: any[]) => {
        this.projetos = response;
      }
    })
  }

  getProjectTasks(projeto: number) {
    if (projeto && projeto > 0) {
      this.tarefasService.listByProjeto(projeto).subscribe({
        next: (tarefas: any) => {
          this.tarefas = tarefas;
          this.horasSemana = tarefas.totalHoras;
          this.basicData = {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
            datasets: [
              {
                label: 'Tarefas',
                data: [this.tarefas.segunda, this.tarefas.terca, this.tarefas.quarta, this.tarefas.quinta, this.tarefas.sexta, this.tarefas.sabado, this.tarefas.domingo],
                backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                borderWidth: 1,
                heigth: 300,
                width: 300
              }
            ]
          };
        }
      })
    } else {
      this.tarefas = null;
    }
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  }

}
