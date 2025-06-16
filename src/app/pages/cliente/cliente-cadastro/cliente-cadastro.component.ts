import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import Cliente from 'src/app/models/cliente/cliente';
import { MensagemService } from 'src/app/services/message/Mensagem.service';

interface TipoCliente {
  descricao: string;
};
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
  tiposCliente: TipoCliente[] = [
    { descricao: 'Pessoa Física' },
    { descricao: 'Pessoa Jurídica' }
  ]
  changeViewCpfCnpj?: string;
  constructor(private fb: FormBuilder, private messageService: MensagemService, private router: Router, private activatedRouter: ActivatedRoute, private clienteService: ClienteService) { }

  initForm() {
    this.form = this.fb.group({
      razaoSocial: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      cnpj: [null, null],
      cpf: [null, null],
      telefone: [null, [Validators.required]],
      celular: [null, null],
      email: [null, [Validators.required, Validators.email]],
      logradouro: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      cep: [null, null],
      cidade: [null, [Validators.required]],
    })
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
          this.messageService.erro(this.title, `${error.error.error ? error.error.error : 'Erro ao consultar os dados do cliente, tente novamente mais tarde!'}`);
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

  tipoClienteChange() {
    this.changeCPFCNPJValidator();

  }

  changeCPFCNPJValidator() {
    if (this.form.get('tipo')?.value === 'Pessoa Física') {
      this.form.get('cnpj')?.clearValidators();
      this.form.get('cpf')?.setValidators([Validators.required]);
      this.form.get('cnpj')?.updateValueAndValidity();
      this.form.get('cpf')?.updateValueAndValidity();
      this.changeViewCpfCnpj = "Pessoa Física";
    } if (this.form.get('tipo')?.value === 'Pessoa Jurídica') {
      this.form.get('cpf')?.clearValidators();
      this.form.get('cnpj')?.setValidators([Validators.required]);
      this.form.get('cpf')?.updateValueAndValidity();
      this.form.get('cnpj')?.updateValueAndValidity();
      this.changeViewCpfCnpj = "Pessoa Jurídica";
    } else {
      this.form.get('cnpj')?.clearValidators();
      this.form.get('cpf')?.clearValidators();
      this.form.get('cnpj')?.updateValueAndValidity();
      this.form.get('cpf')?.updateValueAndValidity();
      this.changeViewCpfCnpj = undefined;
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
      cliente.id = this.id;

      if (!this.id) {
        this.clienteService.create(cliente).subscribe({
          next: (response: Cliente) => {
            this.messageService.sucesso('Cadastro de Cliente', 'Cliente Cadastrado com sucesso!');
            this.loading = false;
            setTimeout(() => { this.router.navigateByUrl('cliente') }, 1000);
          },
          error: (error: any) => {
            this.messageService.erro(this.title, `${error.error.error}`);
            this.loading = false;
          }
        })
      } else {
        this.title == 'Cadastro de Cliente' ? 'Editar Cliente' : 'Cadastro de Cliente';
        this.clienteService.update(this.id, cliente).subscribe({
          next: (response: Cliente) => {
            this.messageService.sucesso(this.title, 'Cliente Editado com sucesso!');
            this.loading = false;
            setTimeout(() => { this.router.navigateByUrl('cliente') }, 2000);
          },
          error: (error: any) => {
            this.messageService.sucesso(this.title, `${error.error.error}`);
            this.loading = false;
          }
        });
      }
    } else {
      this.messageService.erro('Cadastro de Cliente', 'Preencha todos os campos obrigatórios');
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
