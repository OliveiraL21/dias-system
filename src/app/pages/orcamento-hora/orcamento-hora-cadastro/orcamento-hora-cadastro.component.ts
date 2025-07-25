import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Utils } from 'src/app/common/helpers/utils/utils';
import Cliente from 'src/app/models/cliente/cliente';
import { CustomFormControls } from 'src/app/models/custonsModels/CustomFormData/CustomFormControls';
import CustomInputNumberData from 'src/app/models/custonsModels/customInputNumberData/CustomInputNumberData';
import CustomSelectData from 'src/app/models/custonsModels/CustomSelect/CustomSelectData';
import { Empresa } from 'src/app/models/empresa/Empresa';
import { OrcamentoHoraCreate } from 'src/app/models/orcamentoHora/OrcamentoHoraCreate';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { MensagemService } from 'src/app/services/message/Mensagem.service';
import { OrcamentoHoraService } from 'src/app/services/orcamentoHora/orcamento-hora.service';

@Component({
  selector: 'app-orcamento-hora-cadastro',
  templateUrl: './orcamento-hora-cadastro.component.html',
  styleUrl: './orcamento-hora-cadastro.component.css',
  providers: [ConfirmationService]
})
export class OrcamentoHoraCadastroComponent {
  loading: boolean = false;
  form!: FormGroup;
  title: string = 'Cadastro de Orçamento por hora';
  id?: string = this.activatedRouter.snapshot.paramMap.get('id') ?? undefined;
  clientes: Cliente[] = [];
  empresas: Empresa[] = [];


  constructor(private fb: FormBuilder, private service: OrcamentoHoraService, private clienteService: ClienteService, private empresaService: EmpresaService, private router: Router, private activatedRouter: ActivatedRoute, private confirmationService: ConfirmationService, private messageService: MensagemService) { }

  getCustomFormControls(): CustomFormControls[] {
    return [
      {
        type: 'number',
        data: new CustomInputNumberData('numero', 'Número', 'numero', '', true, this.id ? true : false)
      },
      {
        type: 'select',
        data: new CustomSelectData('razaoSocial', 'id', false, "", true, "ex: Dias System", "empresaId", "Empresa", this.empresas, true),
      },
      {
        type: 'select',
        data: new CustomSelectData('razaoSocial', 'id', false, "", true, "ex: Cliente", "clienteId", "Cliente", this.clientes, true),
      },
      {
        type: 'number',
        data: new CustomInputNumberData('valorHora', 'Valor da Hora', 'valorHora', '', true, true)
      },
      {
        type: 'number',
        data: new CustomInputNumberData('valorTotal', 'Valor Total', 'valorTotal', '', true, this.id ? true : false)
      },
    ]
  }

  getClientes() {
    this.clienteService.listaSimples().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  getEmpresas() {
    this.empresaService.list().subscribe({
      next: (empresas: Empresa[]) => {
        this.empresas = empresas;
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  initForm() {
    this.form = this.fb.group({
      numero: [null, null],
      empresaId: [null, [Validators.required]],
      clienteId: [null, [Validators.required]],
      valorTotal: [null, null],
      valorHora: [null, [Validators.required]],
      servicos: this.fb.array([])
    })
  }

  get servicosFormArray(): FormArray {
    return this.form.get('servicos') as FormArray;
  }

  createServico(): FormGroup {
    return this.fb.group({
      id: [null, null],
      descricao: [null, [Validators.required]],
      quantidadeHora: [null, [Validators.required]]
    })
  }

  adicionarServico() {
    this.servicosFormArray?.push(this.createServico());
  }

  removerServico(event: Event, i: number, id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Deseja realmente excluir o serviço selecionado?",
      header: 'Serviço',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.loading = true;
        this.servicosFormArray.removeAt(i),
          this.loading = false;
      },
    })
  }

  ngOnInit() {
    this.initForm();
    this.getClientes();
    this.getEmpresas();
    if (this.id) {
      this.title = 'Editar Orçamento';
    }
  }

  create(data: any) {
    let orcamento: OrcamentoHoraCreate = {
      empresaId: data.empresaId,
      clienteId: data.clienteId,
      valorHora: data.valorHora,
      servicos: data.servicos.map((servico: any) => ({
        descricao: servico.descricao,
        quantidadeHora: servico.quantidadeHora,
      }))
    }
    this.service.create(orcamento).subscribe({
      next: (response: OrcamentoHoraCreate) => {
        this.messageService.sucesso('Orçamento Por Hora', 'Orçamento criado com sucesso!');
        this.loading = false;
        this.router.navigateByUrl('orcamentoPorHora');
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  update(data: any) {

  }
  salvar() {
    this.loading = true;
    if (this.form.valid) {
      let data = this.form.value;
      if (!this.id) {
        this.create(data);
      } else {
        this.update(data);
      }
    } else {
      Utils.getRequiredFieldsInvalid(this.form);
      this.messageService.erro('Error', 'Por favor preencha todos os campos obrigatórios.');
      this.loading = false;
    }
  }

  cancelar() {
    this.router.navigateByUrl('orcamentoPorHora');
  }
}
