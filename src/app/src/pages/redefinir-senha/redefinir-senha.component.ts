import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/user-service/user.service';
import { ResetSenha } from '../../models/redefinirSenha/resetSenha';
import { EsqueceuSenhaService } from 'src/app/services/esqueceu-senha/esqueceu-senha.service';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrl: './redefinir-senha.component.css',
  providers: [MessageService]
})
export class RedefinirSenhaComponent {
  @ViewChild('passwordRef') passwordRef!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmPassRef') confirmPassRef!: ElementRef<HTMLInputElement>;

  form!: FormGroup;
  loading: boolean = false;
  setPasswordVisibleIcon: string = "pi pi-eye-slash";
  setConfirmPassVisibleIcon: string = 'pi pi-eye-slash';
  usuarioId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id') ?? "");
  email: string = this.activatedRoute.snapshot.paramMap.get("email") ?? "";
  codigoRecuperacao: string = this.activatedRoute.snapshot.paramMap.get("codigo") ?? "";

  constructor(private fb: FormBuilder, private route: Router, private recuperaSenhaService: EsqueceuSenhaService, private activatedRoute: ActivatedRoute, private messageService: MessageService) { }

  isStrongPassword(password: FormControl): ValidationErrors | null {
    if (password.value) {
      const hasSpecialCaractere = /^(?=.*[@$!%^&*()_+=-])[^\s_]+$/.test(password.value);
      const hasUpperCaseCaractere = /[A-Z]/.test(password.value);

      return hasSpecialCaractere && hasUpperCaseCaractere ? null : { strongPassword: true }
    }
    return null
  }

  changeVisibility(input: string) {
    if (input == 'password') {
      this.setPasswordVisibleIcon == 'pi pi-eye' ? this.setPasswordVisibleIcon = 'pi pi-eye-slash' : this.setPasswordVisibleIcon = 'pi pi-eye';
      this.passwordRef.nativeElement.type = this.setPasswordVisibleIcon == 'pi pi-eye' ? 'text' : 'password';
    } else {
      this.setConfirmPassVisibleIcon == 'pi pi-eye' ? this.setConfirmPassVisibleIcon = 'pi pi-eye-slash' : this.setConfirmPassVisibleIcon = 'pi pi-eye';
      this.confirmPassRef.nativeElement.type = this.setConfirmPassVisibleIcon == 'pi pi-eye' ? 'text' : 'password';
    }
  }

  isConfirmPasswordEqual(confirmPassword: FormControl): ValidationErrors | null {
    if (confirmPassword.value) {
      const password = confirmPassword.parent?.get('password')?.value;
      return confirmPassword.value === password ? null : { confirmPassError: true };
    }
    return null;
  }

  initForm() {
    this.form = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(8), this.isStrongPassword]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8), this.isConfirmPasswordEqual]]
    });
  }



  Show(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message });
  }

  ngOnInit() {
    this.initForm();
  }

  enviar() {
    if (this.form.valid) {
      this.loading = true;

      let recuperaSenha = new ResetSenha();
      recuperaSenha.id = this.usuarioId;
      recuperaSenha.email = this.email;
      recuperaSenha.token = this.codigoRecuperacao;
      recuperaSenha.password = this.form.get('password')?.value;
      recuperaSenha.PasswordConfirm = this.form.get('confirmPassword')?.value;

      this.recuperaSenhaService.redefinirSenha(recuperaSenha).subscribe({
        next: (response: any) => {
          this.route.navigateByUrl('/login');
          this.Show('success', 'Recuperação de Senha', response.message);
          this.loading = false;
        },
        error: (error: any) => {
          this.Show('error', 'Recuperação de Senha', error.message ?? 'Error ao tentar cadastrar o usuário');
          this.loading = false;
        }
      });
    } else {
      this.Show('error', 'Novo Usuário', 'Campos obrigatórios não preenchidos');
      Object.values(this.form.controls).forEach((control: AbstractControl) => {
        if (!control.valid && control.hasError('required')) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

}
