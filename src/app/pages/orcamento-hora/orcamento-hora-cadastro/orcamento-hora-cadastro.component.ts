import { Component } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import Cliente from 'src/app/models/cliente/cliente';
import { CustomFormControls } from 'src/app/models/custonsModels/CustomFormData/CustomFormControls';
import CustomInputNumberData from 'src/app/models/custonsModels/customInputNumberData/CustomInputNumberData';
import CustomSelectData from 'src/app/models/custonsModels/CustomSelect/CustomSelectData';
import { Empresa } from 'src/app/models/empresa/Empresa';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
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


  constructor(private fb: FormBuilder, private service: OrcamentoHoraService, private clienteService: ClienteService, private empresaService: EmpresaService, private router: Router, private activatedRouter: ActivatedRoute, private confirmationService: ConfirmationService) { }

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
    if (this.id) {
      this.title = 'Editar Orçamento';
    }
  }
}
