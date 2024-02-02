import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EsqueceuSenhaService } from 'src/app/services/esqueceu-senha/esqueceu-senha.service';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrl: './esqueceu-senha.component.css',
  providers: [MessageService]
})
export class EsqueceuSenhaComponent {

  form!: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private esqueceuSenhaService: EsqueceuSenhaService) {

  }


  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }


  enviar() {
    if (this.form.valid) {
      this.esqueceuSenhaService.solicitarResetSenha({ email: this.form.get("email")?.value }).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      Object.values(this.form.controls).forEach((control: AbstractControl) => {
        if (control.invalid && control.hasError('required')) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }
}
