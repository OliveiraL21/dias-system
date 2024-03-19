import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  @ViewChild('passwordRef') passwordRef!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmPassRef') confirmPassRef!: ElementRef<HTMLInputElement>;

  form!: FormGroup;
  setPasswordVisibleIcon: string = "pi pi-eye-slash";
  setConfirmPassVisibleIcon: string = 'pi pi-eye-slash';
  loading: boolean = false;


  constructor(private fb: FormBuilder, private route: Router, private activatedRoute: ActivatedRoute, private userService: UsersService, private messageService: MessageService) { }


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
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
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

  login() {
    this.route.navigateByUrl('/login');
  }

  criar() {
    if (this.form.valid) {
      this.loading = true;
      let usuario = new Usuario();
      usuario = this.form.value;

      this.userService.create(usuario).subscribe({
        next: (response: any) => {
          if (response.isSuccess) {
            this.route.navigateByUrl('/login');
            this.Show('success', 'Novo Usuário', 'Usuário cadastrado com sucesso');
            this.loading = false;
          }
        },
        error: (error: any) => {
          this.loading = false;
          this.Show('error', 'Novo Usuário', error.error.error ?? 'Error ao tentar cadastrar o usuário');
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
