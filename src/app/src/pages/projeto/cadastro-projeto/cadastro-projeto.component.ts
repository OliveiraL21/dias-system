import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import Cliente from 'src/app/src/models/cliente/cliente';

@Component({
  selector: 'app-cadastro-projeto',
  templateUrl: './cadastro-projeto.component.html',
  styleUrl: './cadastro-projeto.component.css',
  providers: [MessageService]
})
export class CadastroProjetoComponent {

  form!: FormGroup;
  loading: boolean = false;
  id: any = this.activatedRouter.snapshot.paramMap.get('id');
  title: string = 'Cadastro de Projetos';
  clientes: Cliente[] = [];

  constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router, private activatedRouter: ActivatedRoute, private clienteService: ClienteService, private service: ProjetoService) { }

  show(type: string, title: string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message });
  }

  initForm() {
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      dataInicio: [null, [Validators.required]],
      dataFim: [null, [Validators.required]],
      cliente: [null, [Validators.required]],
      status: [null, [Validators.required]]
    })
  }

  getClientes() {
    this.clienteService.listarTodos().subscribe({
      next: (response: Cliente[]) => {
        this.clientes = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  ngOnInit() {
    this.initForm();
    this.getClientes();
  }

  save() {

  }

  cancelar() {
    this.router.navigateByUrl('projeto/listagem');
  }

}
