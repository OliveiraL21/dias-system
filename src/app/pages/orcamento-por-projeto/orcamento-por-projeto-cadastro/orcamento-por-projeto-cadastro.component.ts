import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Cliente from 'src/app/models/cliente/cliente';
import { CustomFormControls } from 'src/app/models/custonsModels/CustomFormData/CustomFormControls';
import CustomInputNumberData from 'src/app/models/custonsModels/customInputNumberData/CustomInputNumberData';
import CustomSelectData from 'src/app/models/custonsModels/CustomSelect/CustomSelectData';
import { CustomInputText } from 'src/app/models/custonsModels/CustomTextInputData/CustomInputText';
import { Empresa } from 'src/app/models/empresa/Empresa';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { MensagemService } from 'src/app/services/message/Mensagem.service';
import { OrcamentoPorProjetoService } from 'src/app/services/orcamentoPorProjeto/orcamento-por-projeto.service';

@Component({
  selector: 'app-orcamento-por-projeto-cadastro',
  templateUrl: './orcamento-por-projeto-cadastro.component.html',
  styleUrl: './orcamento-por-projeto-cadastro.component.css'
})
export class OrcamentoPorProjetoCadastroComponent {

  loading: boolean = false;
  form!: FormGroup;
  title: string = "Cadastro de Orçamentos por projeto";
  id: string | null = this.activeRouter.snapshot.paramMap.get('id') ?? null;
  empresas: Empresa[] = [];
  clientes: Cliente[] = [];

  constructor(private fb: FormBuilder, private router: Router, private activeRouter: ActivatedRoute, private service: OrcamentoPorProjetoService, private messageService: MensagemService, private empresaService: EmpresaService, private clienteService: ClienteService) { }

  cancel() {
    this.router.navigateByUrl('orcamentoPorProjeto');
  }


  save($data: any) {
    throw new Error('Method not implemented.');
  }

  initForm() {
    this.form = this.fb.group({
      numero: [null, null],
      empresaId: [null, [Validators.required]],
      clienteId: [null, [Validators.required]],
      valorTotal: [null, null],
      createAt: [null, null],
    })
  }

  getCustomControls(): CustomFormControls[] {
    return [
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
        data: new CustomInputNumberData('valorTotal', 'Valor Total', 'valorTotal', 'currency', true, this.id ? true : false),
      },
      {
        type: 'data',
        data: new CustomInputText('createAt', "Informe a data", "createAt", "Data", "createAt", false, true, "dd/MM/yyyy", this.id ? true : false),
      }
    ]
  }

  getEmpresas() {
    this.empresaService.list().subscribe({
      next: (empresas: Empresa[]) => {
        this.empresas = empresas;
      }, error: () => {
        this.loading = false;
      }
    })
  }

  getClientes() {
    this.clienteService.listaSimples().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
      }, error: () => {
        this.loading = false;
      }
    })
  }

  ngOnInit() {
    this.initForm();
    this.getClientes();
    this.getEmpresas();
  }
}
