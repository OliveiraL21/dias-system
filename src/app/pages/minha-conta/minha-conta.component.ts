import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/user-service/user.service';
import { Usuario } from '../../models/usuario/usuario';
import { FileUpload, UploadEvent } from 'primeng/fileupload';

import { MensagemService } from 'src/app/services/message/Mensagem.service';
import { Utils } from 'src/app/common/helpers/utils/utils';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrl: './minha-conta.component.css',
  providers: [MessageService]
})
export class MinhaContaComponent {
  @ViewChild("profileImageRef") profileImageRef!: FileUpload;
  form!: FormGroup;
  file!: any;
  loading: boolean = false;
  id: any = this.activatedRouter.snapshot.paramMap.get('id');
  usuario: Usuario = new Usuario();
  files: any[] = [];




  constructor(private fb: FormBuilder, private messageService: MensagemService, private router: Router, private activatedRouter: ActivatedRoute, private service: UsersService) { }

  initForm() {
    this.form = this.fb.group({
      profileImageUrl: [null, null],
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, null]
    })
  }

  cancelar() {
    history.back();
  }

  uploadPhoto(event: any) {
    if (event.currentFiles) {
      this.files = [event.currentFiles[0]];
    }
  }

  clearPhoto() {
    this.file = null;
    console.log(this.file);
  }

  getUser() {
    this.loading = true;
    const userId = localStorage.getItem('Id') !== undefined && localStorage.getItem('Id') !== null ? localStorage.getItem('Id') : null;

    if (userId) {
      this.service.details(userId).subscribe({
        next: (response: any) => {
          this.id = response.id;
          Object.keys(response).forEach((key: any) => {
            this.form.get(key)?.setValue(response[key]);
          });

          if (response.profileImageUrl) {
            let arquivo = Utils.convertBase64ToBlob(response.profileImageUrl);
            if (arquivo) {
              let file = new File([arquivo], 'profileImage', { type: 'image/png' });
              this.files = [...this.files, file];
            }

          }
          this.loading = false;
        },

        error: (error: any) => {
          console.log(error);
          this.messageService.erro("Minha Conta", "Erro ao trazer os dados do usuário, tente novamente mais tarde");
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
      this.usuario.profileImageUrl = await Utils.convertToBase64(this.files[0]);

      this.service.update(this.id, this.usuario).subscribe({
        next: (response: Usuario) => {
          this.messageService.sucesso('Minha Conta', 'Dados atualizados com sucesso!');
          history.back();
          this.loading = false;
        }, error: (error: any) => {
          this.loading = false;
          this.messageService.erro('Minha Conta', `${error.error.error ? error.error.error : 'Erro ao tentar atualizar os dados, entre me contato com o suporte'}`);

        }
      })

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

  ngOnInit() {
    this.initForm();
    this.getUser();
  }
}
