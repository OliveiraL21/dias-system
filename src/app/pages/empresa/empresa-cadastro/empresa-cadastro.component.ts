import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EmpresaCreate } from 'src/app/models/empresa/EmpresaCreate';
import { EmpresaUpdate } from 'src/app/models/empresa/EmpresaUpdate';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { MensagemService } from 'src/app/services/message/Mensagem.service';

@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.component.html',
  styleUrl: './empresa-cadastro.component.css',
  providers: [MessageService]
})
export class EmpresaCadastroComponent {
  loading: boolean = false;
  form!: FormGroup;
  title: string = 'Cadastro de Empresa';
  id: string = this.activetedRouter.snapshot.params['id'];

  constructor(private messageService: MensagemService, private fb: FormBuilder, private router: Router, private activetedRouter: ActivatedRoute, private service: EmpresaService) { }

  initForm() {
    this.form = this.fb.group({
      razaoSocial: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, [Validators.required]],
      celular: [null, [Validators.required]],
      logradouro: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      cep: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      estado: [null, [Validators.required, Validators.maxLength(2)]],
    });
  }

  create(data: any) {
    this.loading = true;
    let empresa: EmpresaCreate = data;
    empresa.cpf = empresa.cpf.replace(/\D/g, ''); // Remove non-numeric characters
    this.service.create(empresa).subscribe({
      next: (response: EmpresaCreate) => {
        this.loading = false;
        this.messageService.sucesso('Empresa', 'Empresa cadastrada com sucesso!');
        this.router.navigateByUrl('empresa');
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    });
  }

  update(data: any) {
    this.loading = true;
    let empresa: EmpresaUpdate = data;
    empresa.id = this.id;
    empresa.cpf = empresa.cpf.replace(/\D/g, '');
    this.service.update(this.id, empresa).subscribe({
      next: (response: EmpresaUpdate) => {
        this.loading = false;
        this.messageService.sucesso('Empresa', 'Empresa atualizada com sucesso!');
        this.router.navigateByUrl('empresa');
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      },
    });
  }

  save() {
    if (this.form.valid) {
      console.log(this.form.value);
      if (this.id) {
        this.update(this.form.value);
      } else {
        this.create(this.form.value);
      }
    } else {
      Object.values(this.form.controls).forEach((control: AbstractControl) => {
        if (control.hasError('required') && control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
      this.messageService.erro('Erro', 'Preencha todos os campos obrigatórios!');
      this.loading = false;
    }
  }
  cancelar() {
    this.router.navigateByUrl('empresa');
  }

  ngOnInit() {
    this.initForm();
    if (this.id) {
      this.title = 'Edição de Empresa';
      console.log('Editando empresa com ID:', this.id);
    }
  }
}
