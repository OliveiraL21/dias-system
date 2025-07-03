import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, MenuItem, MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { StatusService } from 'src/app/services/status/status.service';
import Cliente from 'src/app/models/cliente/cliente';
import { Projeto } from 'src/app/models/projeto/projeto';
import { Status } from 'src/app/models/status/status';
import { MensagemService } from 'src/app/services/message/Mensagem.service';
import { Tarefa } from 'src/app/models/tarefa/tarefa';
import { TarefaService } from 'src/app/services/tarefas/tarefa.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-cadastro-projeto',
  templateUrl: './cadastro-projeto.component.html',
  styleUrl: './cadastro-projeto.component.css',
  providers: [MessageService]
})
export class CadastroProjetoComponent {

  form!: FormGroup;
  loading: boolean = false;
  id: any = this.activatedRouter.snapshot.paramMap.get('id');
  title: string = 'Cadastro de Projetos';
  clientes: Cliente[] = [];
  status: Status[] = [];
  projeto: any;
  tarefas: Tarefa[] = [];
  calcularButtonItems: MenuItem[];
  total: number = 0;
  rows?: number = 10;


  constructor(private fb: FormBuilder, private messageService: MensagemService, private router: Router, private activatedRouter: ActivatedRoute, private clienteService: ClienteService, private service: ProjetoService, private statusService: StatusService, private tarefaService: TarefaService, private reportService: ReportService) {
    this.calcularButtonItems = [
      {
        label: 'Calcular por periodo',
        icon: 'pi pi-calendar',
        styleClass: 'calulatorButton',
        command: () => {
          this.calculoPorPeriodo();
        }
      },
      {
        label: 'Calculo total do projeto',
        icon: 'pi pi-calculator',
        command: () => {
          this.calculoTotalProjeto();
        }
      }
    ]
  }

  calculoTotalProjeto() {
    this.loading = true;
    this.reportService.servicosPrestados(this.id).subscribe({
      next: (response: Blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(response);
        a.href = objectUrl;
        a.download = `servicos_prestados_${this.id}.pdf`;
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.messageService.sucesso('Relatório de Serviços Prestados', 'Relatório gerado com sucesso!');
        this.loading = false;
      }, error: (error: any) => {
        this.loading = false;
      }
    })
  }

  calculoPorPeriodo() {

  }

  initForm() {
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      dataInicio: [null, [Validators.required]],
      dataFim: [null, [Validators.required]],
      cliente: [null, [Validators.required]],
      status: [null, [Validators.required]]
    })
  }

  getClientes() {
    this.clienteService.listarTodos().subscribe({
      next: (response: Cliente[]) => {
        this.clientes = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  getTarefas(lazyEvent: TableLazyLoadEvent) {
    this.total = 0;
    let pageNumber = lazyEvent.first === 0 || lazyEvent.first === undefined ? 0 : lazyEvent.first / (lazyEvent.rows == undefined ? 1 : lazyEvent.rows) + 1;
    this.rows = lazyEvent.rows === null ? 10 : lazyEvent.rows;
    this.tarefaService.getByProjeto(pageNumber, this.rows ?? 10, this.id).subscribe({
      next: (response: any) => {
        this.tarefas = response.data.map((tarefa: Tarefa) => ({
          ...tarefa,
          horaInicio: tarefa.horarioInicio ? tarefa.horarioInicio.substring(11, 16) : '--:--',
          horaFim: tarefa.horarioFim ? tarefa.horarioFim.substring(11, 16) : '--:--',
          duracao: tarefa.duracao ? tarefa.duracao.substring(11, 16) : '--:--'
        }));
        this.total = response.total;
      },
      error: (error: any) => {
        this.messageService.erro('Erro ao carregar tarefas', `${error.error.error}`);
      }
    })

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

  getDetail() {
    if (this.id) {
      this.loading = true;
      this.service.details(this.id).subscribe({
        next: (response: Projeto) => {
          this.projeto = response;
          this.preencherFormulario();
          this.loading = false;
        },
        error: (error: any) => {
          this.loading = false;
          this.messageService.erro(this.title, `${error.error.error ? error.error.error : 'Erro ao consultar os dados do projeto, tente novamente mais tarde!'}`);

        }
      });
    }
  }

  preencherFormulario() {
    if (this.id) {
      Object.keys(this.projeto).forEach((key: string) => {
        this.form.get(key)?.setValue(this.projeto[key]);
      });

      this.form.get('cliente')?.setValue(this.projeto.cliente.id);
      this.form.get('status')?.setValue(this.projeto.status.id);
    }
    console.log(this.clientes);
  }

  ngOnInit() {
    this.initForm();
    this.getClientes();
    this.getStatus();
    this.getDetail();
    this.id ? this.title = 'Editar Projeto' : 'Cadastro de Projeto';
    if (this.id) {
      this.getTarefas({ first: 0, rows: this.rows } as LazyLoadEvent);
    }
  }

  save() {
    this.loading = true;
    if (this.form.valid) {
      const data = this.form.value;

      let cliente = this.clientes.find((x) => x.id == data.cliente);
      let status = this.status.find(x => x.id == data.status);

      let projeto = {
        descricao: data.descricao,
        dataInicio: data.dataInicio,
        dataFim: data.dataFim,
        cliente: cliente !== null && cliente !== undefined ? cliente : null,
        clienteId: data.cliente,
        tarefas: [],
        status: status !== null && status !== undefined ? status : null,
      };

      if (!this.id) {
        this.service.create(projeto).subscribe({
          next: (response: Projeto) => {
            this.loading = false;
            this.messageService.sucesso('Cadastro de Projeto', 'Projeto Cadastrado com sucesso!');
            setTimeout(() => { this.router.navigateByUrl('projeto/listagem') }, 100);
          },
          error: (error: any) => {
            this.messageService.erro(this.title, `${error.error.error}`);
            this.loading = false;
          }
        })
      } else {
        this.title == 'Cadastro de Projeto' ? 'Editar Projeto' : 'Cadastro de Projeto';
        this.service.update(this.id, projeto).subscribe({
          next: (response: Projeto) => {
            this.messageService.sucesso(this.title, 'Projeto Cadastrado com sucesso!');
            this.loading = false;
            setTimeout(() => { this.router.navigateByUrl('projeto/listagem') }, 100);
          },
          error: (error: any) => {
            this.loading = false;
            this.messageService.erro(this.title, `${error.error.error}`);
          }
        });
      }
    } else {
      this.messageService.erro('Cadastro de Projeto', 'Preencha todos os campos obrigatórios');
      Object.values(this.form.controls).forEach((control: AbstractControl) => {
        if (control.hasError('required') && control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
      this.loading = false;
    }
  }

  editarTarefa(id: string) {
    this.router.navigateByUrl(`tarefas/editar/${id}`);
  }

  cancelar() {
    this.router.navigateByUrl('projeto/listagem');
  }

}
