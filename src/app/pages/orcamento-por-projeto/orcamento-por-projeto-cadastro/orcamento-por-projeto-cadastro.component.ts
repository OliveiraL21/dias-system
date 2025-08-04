import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Utils } from 'src/app/common/helpers/utils/utils';
import Cliente from 'src/app/models/cliente/cliente';
import { CustomFormControls } from 'src/app/models/custonsModels/CustomFormData/CustomFormControls';
import CustomInputNumberData from 'src/app/models/custonsModels/customInputNumberData/CustomInputNumberData';
import CustomSelectData from 'src/app/models/custonsModels/CustomSelect/CustomSelectData';
import { CustomInputText } from 'src/app/models/custonsModels/CustomTextInputData/CustomInputText';
import { Empresa } from 'src/app/models/empresa/Empresa';
import { OrcamentoPorProjeto } from 'src/app/models/orcamentoPorProjeto/OrcamentoPorProjeto';
import { OrcamentoPorProjetoCreate } from 'src/app/models/orcamentoPorProjeto/OrcamentoPorProjetoCreate';
import { OrcamentoPorProjetoUpdate } from 'src/app/models/orcamentoPorProjeto/OrcamentoPorProjetoUpdate';
import { Produto } from 'src/app/models/produto/Produto';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { MensagemService } from 'src/app/services/message/Mensagem.service';
import { OrcamentoPorProjetoService } from 'src/app/services/orcamentoPorProjeto/orcamento-por-projeto.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { ProdutoOrcamentoService } from 'src/app/services/produtoOrcamento/ProdutoOrcamento.service';

@Component({
  selector: 'app-orcamento-por-projeto-cadastro',
  templateUrl: './orcamento-por-projeto-cadastro.component.html',
  styleUrl: './orcamento-por-projeto-cadastro.component.css',
  providers: [ConfirmationService]
})
export class OrcamentoPorProjetoCadastroComponent {

  loading: boolean = false;
  form!: FormGroup;
  title: string = "Cadastro de Orçamentos por projeto";
  id: string | null = this.activeRouter.snapshot.paramMap.get('id') ?? null;
  empresas: Empresa[] = [];
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  listOfProdutos: any[] = [];
  produtoSelecionado?: Produto;

  constructor(private fb: FormBuilder, private router: Router, private activeRouter: ActivatedRoute, private service: OrcamentoPorProjetoService, private messageService: MensagemService, private empresaService: EmpresaService, private clienteService: ClienteService, private produtoService: ProdutoService, private confirmationService: ConfirmationService, private produtoOrcamentoService: ProdutoOrcamentoService) { }

  getProdutoDescrition(id: string): string {
    return this.produtos.find(x => x.id == id)?.descricao ?? "";
  }

  createOrcamento(data: any) {
    let orcamento: OrcamentoPorProjetoCreate = new OrcamentoPorProjetoCreate();
    orcamento.clienteId = data.clienteId;
    orcamento.empresaId = data.empresaId;
    orcamento.tempoDeEntrega = data.tempoDeEntrega;
    orcamento.produtos = data.produtos.map((produto: any) => ({
      empresaId: data.empresaId,
      produtoId: produto.descricao,
      descricao: this.getProdutoDescrition(produto.descricao),
      valorTotalVenda: produto.valor,
      quantidade: produto.quantidade,
    }));

    this.service.create(orcamento).subscribe({
      next: (response: OrcamentoPorProjetoCreate) => {
        this.loading = true;
        this.messageService.sucesso('Orçamento Por Projeto', 'Orçamento criado com sucesso!');
        this.router.navigateByUrl('orcamentoPorProjeto');
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  updateOrcamento(data: any) {
    this.loading = true;
    let orcamento: OrcamentoPorProjetoUpdate = {
      id: this.id ?? undefined,
      empresaId: data.empresaId,
      clienteId: data.clienteId,
      createAt: data.createAt,
      tempoDeEntrega: data.tempoDeEntrega,
      numero: data.numero,
      valorTotal: data.valorTotal,
      produtos: data.produtos?.map((produto: Produto) => ({
        id: produto.id,
        orcamentoId: this.id,
        produtoId: produto.descricao,
        descricao: this.getProdutoDescrition(produto.descricao),
        valorTotalVenda: produto.valor,
        quantidade: produto.quantidade
      }))
    }
    this.service.update(this.id ?? "", orcamento).subscribe({
      next: (response: OrcamentoPorProjetoUpdate) => {
        this.messageService.sucesso('Orçamento por projeto', 'Orçamento atualizado com sucesso!');
        this.loading = false;
        this.router.navigateByUrl('orcamentoPorProjeto');
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  getOrcamento() {
    this.loading = true;
    this.service.details(this.id ?? "")?.subscribe({
      next: (orcamento: OrcamentoPorProjetoUpdate) => {
        this.loading = false;

        Object.keys(orcamento)?.forEach((key: string) => {
          if (key !== 'produtos')
            this.form.get(key)?.setValue(orcamento[key as keyof OrcamentoPorProjeto]);
        })
        var formArray = this.ProdutoOrcamento;
        formArray.clear();

        orcamento.produtos?.forEach((produto: any) => {
          formArray.push(this.fb.group({
            id: produto.id,
            descricao: produto.produtoId,
            quantidade: produto.quantidade,
            valor: { disabled: true, value: produto.valorTotalVenda },
            valorUnitario: produto.valor,
          }))
        });
      }
    })
  }

  save() {
    this.loading = true;
    if (this.form.valid) {
      let data = this.form.getRawValue();
      if (!this.id) {
        this.createOrcamento(data);
      } else {
        this.updateOrcamento(data);
      }
    } else {
      Utils.getRequiredFieldsInvalid(this.form);
      this.loading = false;
      this.messageService.erro('Erro', 'Por favor preencha todos os campos obrigatórios.');
    }
  }

  setProdutoValue(id: string, i: number) {
    const produto = this.produtos.find(x => x.id === id);

    const formArray = this.form.get('produtos') as FormArray;
    const grupo = formArray.at(i);

    if (produto) {
      // Guarda o valor unitário "real" para não sobrescrever depois com o total
      grupo.get('valor')?.setValue(produto.valor);
      grupo.get('valorUnitario')?.setValue(produto.valor); // novo campo para preservar valor original
    } else {
      grupo.get('valor')?.setValue(null);
      grupo.get('valorUnitario')?.setValue(null);
    }
  }

  calcularValorUnitarioTotal(quantidade: number, index: number) {
    const formArray = this.form.get('produtos') as FormArray;
    const grupo = formArray.at(index);

    const valorUnitario = grupo.get('valorUnitario')?.value ?? 0;

    if (quantidade && quantidade > 0) {
      grupo.get('valor')?.setValue(valorUnitario * quantidade);
    } else {
      grupo.get('valor')?.setValue(valorUnitario);
    }

  }

  getProdutos() {
    this.produtoService.list().subscribe({
      next: (produtos: Produto[]) => {
        this.produtos = produtos;
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  get ProdutoOrcamento(): FormArray {
    return this.form.get('produtos') as FormArray;
  }



  adicionarProduto() {
    var formG = this.fb.group({
      id: [null, null],
      descricao: [null, [Validators.required]],
      quantidade: [null, [Validators.required]],
      valor: [{ disabled: true, value: null }, [Validators.required]],
      valorUnitario: [null, null]
    });
    this.ProdutoOrcamento?.push(formG);
  }

  removerProduto(event: Event, i: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Deseja realmente excluir o produto selecionado?",
      header: 'Produto',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.loading = true;
        let id = this.ProdutoOrcamento.at(i)?.get('id')?.value;
        console.log(id);
        if (id) {
          this.produtoOrcamentoService.delete(id).subscribe({
            next: (response: boolean) => {
              this.ProdutoOrcamento?.removeAt(i);
              this.loading = false;
            }, error: (error: HttpErrorResponse) => {
              this.loading = false;
            }
          })
        } else {
          this.ProdutoOrcamento?.removeAt(i);
          this.loading = false;
        }
      },
    })

  }

  initForm() {
    this.form = this.fb.group({
      numero: [{ disabled: true, value: null }, null],
      empresaId: [null, [Validators.required]],
      clienteId: [null, [Validators.required]],
      valorTotal: [null, null],
      createAt: [null, null],
      tempoDeEntrega: [null, null],
      produtos: this.fb.array([]),
    })
  }

  getCustomControls(): CustomFormControls[] {
    return [
      {
        type: 'number',
        data: new CustomInputNumberData('numero', 'Número', 'numero', '', true, this.id ? true : false, false)
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
        data: new CustomInputNumberData('valorTotal', 'Valor Total', 'valorTotal', 'currency', true, this.id ? true : false),
      },
      {
        type: 'data',
        data: new CustomInputText('createAt', "Informe a data", "createAt", "Data", "createAt", false, true, "dd/MM/yyyy", this.id ? true : false),
      },
      {
        type: 'text',
        data: new CustomInputText('tempoDeEntrega', 'Ex: 30 dias', 'tempoDeEntrega', 'Tempo De Entrega', 'tempoDeEntrega', false, false, '', true),
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
    this.getProdutos();
    this.adicionarProduto();
    if (this.id) {
      this.getOrcamento();
    }
  }

  cancelar() {
    this.router.navigateByUrl("orcamentoPorProjeto");
  }
}
