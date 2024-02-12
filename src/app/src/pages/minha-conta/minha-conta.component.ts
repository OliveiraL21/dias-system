import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/user-service/user.service';
import { Usuario } from '../../models/usuario/usuario';
import { UploadEvent } from 'primeng/fileupload';
import Utils from '../../common/helpers/utils/utils';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrl: './minha-conta.component.css',
  providers: [MessageService]
})
export class MinhaContaComponent {
  form!: FormGroup;
  file!: any;
  loading: boolean = false;
  id: any = this.activatedRouter.snapshot.paramMap.get('id');
  usuario: Usuario = new Usuario();
  utils: Utils = new Utils();



  constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router, private activatedRouter: ActivatedRoute, private service: UsersService) { }

  initForm() {
    this.form = this.fb.group({
      profileImageUrl: [null, null],
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, null]
    })
  }

  cancelar() {
    this.router.navigateByUrl('cliente');
  }

  show(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message });
  }

  uploadPhoto(event: any) {
    if (event.currentFiles) {
      this.file = event.currentFiles[0];
      console.log(this.file);
    }
  }

  clearPhoto() {
    this.file = null;
    console.log(this.file);
  }

  getUser() {
    this.loading = true;
    const userId = parseInt(localStorage.getItem('Id') ?? "") !== undefined && parseInt(localStorage.getItem('Id') ?? "") !== null ? parseInt(localStorage.getItem('Id') ?? "") : 0;

    if (userId) {
      this.service.details(userId).subscribe({
        next: (response: any) => {
          this.id = response.id;
          Object.keys(response).forEach((key: any) => {
            this.form.get(key)?.setValue(response[key]);
          });
          this.loading = false;
        },

        error: (error: any) => {
          console.log(error);
          this.show("error", "Minha Conta", "Erro ao trazer os dados do usuário, tente novamente mais tarde");
          this.loading = false;
        }
      })
    }
  }

  async save() {
    this.loading = true;
    if (this.form.valid) {
      this.usuario.id = this.id;
      this.usuario.email = this.form.get('email')?.value;
      this.usuario.username = this.form.get('username')?.value;
      this.usuario.phoneNumber = this.form.get('phoneNumber')?.value;
      this.usuario.profileImageUrl = await this.utils.convertToBase64(this.file);

      this.service.update(this.usuario).subscribe({
        next: (response: Usuario) => {
          this.show('success', 'Minha Conta', 'Dados atualizados com sucesso!');
          this.loading = false;
        }, error: (error: any) => {
          this.show('error', 'Minha Conta', `${error.error.error ? error.error.error : 'Erro ao tentar atualizar os dados, entre me contato com o suporte'}`);
          this.loading = false;
        }
      })

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

  ngOnInit() {
    this.initForm();
    this.getUser();
  }
}
