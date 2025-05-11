import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Usuario } from '../../models/usuario/usuario';
import { LoginService } from 'src/app/services/login/login.service';
import { UsuarioLogin } from '../../models/login/UsuarioLogin';
import { TokenService } from 'src/app/services/token-service/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MensagemService } from 'src/app/services/message/Mensagem.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [ConfirmationService, MessageService]
})
export class LoginComponent {

  @ViewChild('passwordRef') passwordRef!: ElementRef<HTMLInputElement>;

  form!: FormGroup;
  loading: boolean = false;
  setPasswordVisibleIcon: string = "pi pi-eye-slash";

  constructor(private fb: FormBuilder, private loginService: LoginService, private tokenService: TokenService, private route: Router, private activeRoute: ActivatedRoute, private messageService: MensagemService
  ) { }

  novoUsuario() {
    this.route.navigateByUrl('/novo-usuario');
  }

  initForm() {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.initForm();
  }

  changeVisibility() {
    this.setPasswordVisibleIcon == 'pi pi-eye' ? this.setPasswordVisibleIcon = 'pi pi-eye-slash' : this.setPasswordVisibleIcon = 'pi pi-eye';
    this.passwordRef.nativeElement.type = this.setPasswordVisibleIcon == 'pi pi-eye' ? 'text' : 'password';
  }


  logar() {
    if (this.form.valid) {
      this.loading = true;
      let usuario = new UsuarioLogin();
      usuario = this.form.value;
      this.loginService.login(usuario).subscribe({
        next: (response) => {
          this.tokenService.setToken(response.token);
          if (this.tokenService.possuiToken()) {
            localStorage.setItem('Id', response.usuarioId);
            localStorage.setItem('authenticated', response.authenticated);

            this.messageService.sucesso('Login', 'Login efetuado com sucesso');
            this.loading = false;
            this.route.navigateByUrl('dashboard');
          } else {
            this.messageService.erro('Login', 'Não foi possivel realizar o login, tente novamente mais tarde!');
            this.loading = false;
            console.log("dentro")
          }
        }, error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.messageService.erro('Login', `${error ? error.message : 'Erro ao tentar realizar o login, entre em contato com o suporte técnico'}`);
          console.log(error);
        }
      })

    } else {
      this.messageService.erro('Login', 'Por favor verifique se os campos estão preenchidos corretamente');
      Object.values(this.form.controls).forEach((control: AbstractControl) => {
        if (!control.valid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      })
    }
  }

}
