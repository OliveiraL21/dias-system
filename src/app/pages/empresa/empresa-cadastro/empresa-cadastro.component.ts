import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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

  constructor(private messageService: MensagemService, private fb: FormBuilder, private router: Router, private activetedRouter: ActivatedRoute) { }

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
      estado: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.initForm();
    if (this.id) {
      this.title = 'Edição de Empresa';
      console.log('Editando empresa com ID:', this.id);
    }
  }
}
