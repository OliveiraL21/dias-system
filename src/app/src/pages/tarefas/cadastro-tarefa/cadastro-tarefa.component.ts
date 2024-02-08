import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { StatusService } from 'src/app/services/status/status.service';
import { TarefaService } from 'src/app/services/tarefas/tarefa.service';
import Cliente from 'src/app/src/models/cliente/cliente';
import { Projeto } from 'src/app/src/models/projeto/projeto';
import { Status } from 'src/app/src/models/status/status';
import { Tarefa } from 'src/app/src/models/tarefa/tarefa';

@Component({
  selector: 'app-cadastro-tarefa',
  templateUrl: './cadastro-tarefa.component.html',
  styleUrl: './cadastro-tarefa.component.css',
  providers: [MessageService]
})
export class CadastroTarefaComponent {

  form!: FormGroup;
  loading: boolean = false;
  id: any = this.activatedRouter.snapshot.paramMap.get('id');
  title: string = 'Cadastro de Tarefas';
  clientes: Cliente[] = [];
  projetos: Projeto[] = [];
  status: Status[] = [];

  constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router, private activatedRouter: ActivatedRoute, private clienteService: ClienteService, private projetoService: ProjetoService, private service: TarefaService, private statusService: StatusService) { }

  show(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message });
  }


  listProjetos(): void {
    this.projetoService.listaSimples().subscribe({
      next: (data) => {
        this.projetos = data;
      },
    });
  }

  listaStatus(): void {
    this.statusService.listaTodos().subscribe({
      next: (data) => {
        this.status = data;
      }
    })
  }

  HoraGasta() {
    let horarioInicio: Date = this.form.get('horarioInicio')?.value;
    let horarioFim: Date = this.form.get('horarioFim')?.value;

    if (
      horarioInicio &&
      horarioFim &&
      horarioInicio !== null &&
      horarioFim !== null
    ) {
      this.loading = true;

      if (typeof horarioInicio !== 'object' || typeof horarioFim !== 'object') {
        horarioInicio = new Date(horarioInicio);
        horarioFim = new Date(horarioFim);
      }

      this.service
        .calcularDuracao(
          horarioInicio.toLocaleTimeString(),
          horarioFim.toLocaleTimeString()
        )
        .subscribe({
          next: (data: any) => {
            this.form.get('duracao')?.setValue(data.duracao);

          },
          error: (error: any) => {
            this.show('error', this.title, error.error.error ? error.error.error : 'Erro ao calcular a duração da tarefa, entre em contato com o suporte');
            this.loading = false;
          },
        });
      this.loading = false;
    }
  }

  validarHoras(control: AbstractControl): ValidationErrors | null {
    let horarioInicio = control.parent?.get('horarioInicio')?.value;
    let horarioFim = control.parent?.get('horarioFim')?.value;

    if (
      horarioInicio &&
      horarioInicio !== null &&
      horarioFim &&
      horarioFim !== null
    ) {
      if (typeof horarioFim !== 'object' || typeof horarioInicio !== 'object') {
        horarioFim = new Date(horarioFim);
        horarioInicio = new Date(horarioInicio);
      }

      if (horarioFim < horarioInicio) {
        control.setValue(null);
        return { horarioFinalInvalido: true, error: true };
      }

      return {};
    } else {
      control.parent?.get('duracao')?.setValue(null);
      return {};
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      horarioInicio: [null, [Validators.required, this.validarHoras]],
      horarioFim: [null, [Validators.required, this.validarHoras]],
      duracao: [null, [Validators.required]],
      data: [null, [Validators.required]],
      projetoId: [null, [Validators.required]],
      observacao: [null, null],
      status: [null, [Validators.required]]
    });
  }


  getDetails() {
    this.service.details(this.id).subscribe({
      next: (tarefa: any) => {
        console.log(tarefa);
        Object.keys(tarefa).forEach((key: any) => {
          this.form.get(key)?.setValue(tarefa[key]);
        })

        // this.form.get('descricao')?.setValue(tarefa.descricao);
        // this.form.get('data')?.setValue(tarefa.data);

        // this.form.get('duracao')?.setValue(tarefa.duracao);
        // this.form.get('projeto')?.setValue(tarefa.projetoId);
        // this.form.get('observacao')?.setValue(tarefa.observacao);
        // this.form.get('horarioInicio')?.setValue(tarefa.horarioInicio);
        // this.form.get('horarioFim')?.setValue(tarefa.horarioFim);
        this.form.get('status')?.setValue(tarefa.status.id);
      },
    });
  }

  cancelar() {
    this.router.navigateByUrl('tarefas/listagem');
  }

  ngOnInit() {
    this.initForm();
    this.listProjetos();
    this.listaStatus();
    if (this.id) {
      this.getDetails();
    }
    this.id ? this.title = 'Editar Tarefa' : 'Cadastro de Tarefa';
  }

  save() {

  }
}
