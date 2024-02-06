import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { StatusService } from 'src/app/services/status/status.service';
import Cliente from 'src/app/src/models/cliente/cliente';
import { Projeto } from 'src/app/src/models/projeto/projeto';
import { Status } from 'src/app/src/models/status/status';

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

  constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router, private activatedRouter: ActivatedRoute, private clienteService: ClienteService, private service: ProjetoService, private statusService: StatusService) { }

  show(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message });
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
          this.show('error', this.title, `${error.error.error ? error.error.error : 'Erro ao consultar os dados do projeto, tente novamente mais tarde!'}`);
          this.loading = false;
        }
      });
    }
  }

  preencherFormulario() {
    if (this.id) {
      Object.keys(this.projeto).forEach((key: string) => {
        this.form.get(key)?.setValue(key.includes('data') ? new Date(this.projeto[key]) : this.projeto[key]);
        if (key == 'clienteId') {
          this.form.get('cliente')?.setValue(this.projeto.clienteId);
        }

        if (key == 'statusId') {
          this.form.get('status')?.setValue(this.projeto.statusId);
        }
      });
    }
    console.log(this.clientes);
  }

  ngOnInit() {
    this.initForm();
    this.getClientes();
    this.getStatus();
    this.getDetail();
    this.id ? this.title = 'Editar Projeto' : 'Cadastro de Projeto';
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
            this.show('success', 'Cadastro de Projeto', 'Projeto Cadastrado com sucesso!');
            this.loading = false;
            setTimeout(() => { this.router.navigateByUrl('projeto/listagem') }, 100);
          },
          error: (error: any) => {
            this.show('error', this.title, `${error.error.error}`);
            this.loading = false;
          }
        })
      } else {
        this.title == 'Cadastro de Projeto' ? 'Editar Projeto' : 'Cadastro de Projeto';
        this.service.update(this.id, projeto).subscribe({
          next: (response: Projeto) => {
            this.show('success', this.title, 'Projeto Cadastrado com sucesso!');
            this.loading = false;
            setTimeout(() => { this.router.navigateByUrl('projeto/listagem') }, 100);
          },
          error: (error: any) => {
            this.show('error', this.title, `${error.error.error}`);
            this.loading = false;
          }
        });
      }
    } else {
      this.show('error', 'Cadastro de Projeto', 'Preencha todos os campos obrigatórios');
      Object.values(this.form.controls).forEach((control: AbstractControl) => {
        if (control.hasError('required') && control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
      this.loading = false;
    }
  }

  cancelar() {
    this.router.navigateByUrl('projeto/listagem');
  }

}
