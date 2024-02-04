import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import Cliente from 'src/app/src/models/cliente/cliente';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrl: './cliente-cadastro.component.css',
  providers: [MessageService]
})
export class ClienteCadastroComponent {

  form!: FormGroup;
  loading: boolean = false;
  id: any = this.activatedRouter.snapshot.paramMap.get('id');
  title: string = 'Cadastro de Cliente';
  cliente: any;

  constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router, private activatedRouter: ActivatedRoute, private clienteService: ClienteService) { }

  initForm() {
    this.form = this.fb.group({
      razaoSocial: [null, [Validators.required]],
      cnpj: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      celular: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]]
    })
  }

  show(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message });
  }

  cancelar() {
    this.router.navigateByUrl('cliente');
  }

  getDetail() {
    if (this.id) {
      this.loading = true;
      this.clienteService.details(this.id).subscribe({
        next: (response: Cliente) => {
          this.cliente = response;
          this.preencherFormulario();
          this.loading = false;
        },
        error: (error: any) => {
          this.show('error', this.title, `${error.error.error ? error.error.error : 'Erro ao consultar os dados do cliente, tente novamente mais tarde!'}`);
          this.loading = false;
        }
      });
    }
  }

  preencherFormulario() {
    if (this.id) {
      Object.keys(this.cliente).forEach((key: string) => {
        this.form.get(key)?.setValue(this.cliente[key]);
      });
    }
  }

  ngOnInit() {
    this.initForm();
    this.getDetail();
    this.id ? this.title = 'Editar Cliente' : 'Cadastro de Cliente';
  }

  save() {
    this.loading = true;
    if (this.form.valid) {
      const data = this.form.value;
      let cliente: Cliente = new Cliente();
      cliente = data;

      if (!this.id) {
        this.clienteService.create(cliente).subscribe({
          next: (response: Cliente) => {
            this.show('success', 'Cadastro de Cliente', 'Cliente Cadastrado com sucesso!');
            this.loading = false;
            setTimeout(() => { this.router.navigateByUrl('cliente') }, 2000);
          },
          error: (error: any) => {
            this.show('error', this.title, `${error.error.error}`);
            this.loading = false;
          }
        })
      } else {
        this.title == 'Cadastro de Cliente' ? 'Editar Cliente' : 'Cadastro de Cliente';
        this.clienteService.update(this.id, cliente).subscribe({
          next: (response: Cliente) => {
            this.show('success', this.title, 'Cliente Cadastrado com sucesso!');
            this.loading = false;
            setTimeout(() => { this.router.navigateByUrl('cliente') }, 2000);
          },
          error: (error: any) => {
            this.show('error', this.title, `${error.error.error}`);
            this.loading = false;
          }
        });
      }
    } else {
      this.show('error', 'Cadastro de Cliente', 'Preencha todos os campos obrigatórios');
      Object.values(this.form.controls).forEach((control: AbstractControl) => {
        if (control.hasError('required') && control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
      this.loading = false;
    }
  }


}
