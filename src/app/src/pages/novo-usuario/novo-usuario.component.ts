import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario/usuario';
import { UsersService } from 'src/app/services/user-service/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrl: './novo-usuario.component.css',
  providers: [MessageService]
})
export class NovoUsuarioComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private route: Router, private userService: UsersService, private messageService: MessageService) { }

  initForm() {
    this.form = this.fb.group({
      username: [null, Validators.required],
      email: [null, Validators.required, Validators.email],
      password: [null, Validators.required]
    })
  }

  show(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message });
  }

  ngOnInit() {
    this.initForm();
  }

  login() {
    this.route.navigateByUrl('/login');
  }

  criar() {
    if (this.form.valid) {
      let usuario = new Usuario();
      usuario = this.form.value;

      this.userService.create(usuario).subscribe({
        next: (response: any) => {
          if (response.isSuccess) {
            this.show('success', 'Novo Usuário', 'Usuário cadastrado com sucesso');
            this.route.navigateByUrl('/login');
          }
        },
        error: (error: any) => {
          this.show('error', 'Novo Usuário', error.reasons.message ?? 'Error ao tentar cadastrar o usuário');
        }
      });
    } else {
      this.show('error', 'Novo Usuário', 'Campos obrigatórios não preenchidos');
      Object.values(this.form.controls).forEach((control: AbstractControl) => {
        if (!control.valid && control.hasError('required')) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });

    }
  }
}
