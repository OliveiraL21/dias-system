import { ProdutoService } from 'src/app/services/produto/produto.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import Cliente from 'src/app/models/cliente/cliente';
import { CustomFilter } from 'src/app/models/customFilter/customFilter';
import { CustomButton } from 'src/app/models/custonsModels/CustomButtonData/CustomButton';
import { Produto } from 'src/app/models/produto/Produto';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { MensagemService } from 'src/app/services/message/Mensagem.service';
import { OrcamentoPorProjetoService } from 'src/app/services/orcamentoPorProjeto/orcamento-por-projeto.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { OrcamentoPorProjeto } from 'src/app/models/orcamentoPorProjeto/OrcamentoPorProjeto';
import Column from 'src/app/models/custonsModels/CustomTable/CustomColumn';
import { OrcamentoPorProjetoList } from 'src/app/models/orcamentoPorProjeto/OrcamentoPorProjetoList';

@Component({
  selector: 'app-orcamento-por-projeto-listagem',
  templateUrl: './orcamento-por-projeto-listagem.component.html',
  styleUrl: './orcamento-por-projeto-listagem.component.css',
  providers: [ConfirmationService]
})
export class OrcamentoPorProjetoListagemComponent {

  loading: boolean = false;
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  orcamentos: OrcamentoPorProjetoList[] = [];

  constructor(private router: Router, private service: OrcamentoPorProjetoService, private messageService: MensagemService, private clienteService: ClienteService, private ProdutoService: ProdutoService) { }

  novo($event: any) {
    this.router.navigateByUrl('orcamentoPorProjeto/cadastro');
  }

  getColums(): Column[] {
    return [
      new Column("numero", "Número", false),
      new Column("empresa$razaoSocial", "Empresa", false),
      new Column("cliente$razaoSocial", "Cliente"),
      new Column("createAt", "Data", false),
      new Column("valorTotal", "Valor", false)
    ]
  }


  getCustomButton(): CustomButton {
    return new CustomButton('Novo Orçamento', true, '', 'primary', 'pi pi-plus', 'Novo Orçamento');
  }

  getCustomFilters(): CustomFilter[] {
    return [
      new CustomFilter("numero", "text", "ex: 12345", "Número"),
      new CustomFilter("cliente", "dropdown", "ex: cliente ltda", "Cliente", "", this.clientes, "id", "razaoSocial", true, ""),
      new CustomFilter("produto", 'dropdown', "ex: formatação", "Produto", "", this.produtos, "id", "descricao", true, ""),
    ]
  }

  getProdutos() {
    this.ProdutoService.list().subscribe({
      next: (response: Produto[]) => {
        this.produtos = response;
        this.loading = false;
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  getClientes() {
    this.clienteService.listaSimples().subscribe({
      next: (response: Cliente[]) => {
        this.clientes = response;
        this.loading = false;
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  filtrar(data: any) {
    if (data) {
      this.service.filtrar(data.numero, data.cliente, data.produto).subscribe({
        next: (response: OrcamentoPorProjetoList[]) => {
          this.orcamentos = response;
          this.loading = false;
        }, error: (error: HttpErrorResponse) => {
          this.loading = false;
        }
      })
    }
  }

  getOrcamentos() {
    this.service.list().subscribe({
      next: (response: OrcamentoPorProjetoList[]) => {
        this.orcamentos = response.map((orcamento: OrcamentoPorProjetoList) => ({
          ...orcamento,
          createAt: new Date(parseInt(orcamento.createAt?.toString()?.split('-')[0] ?? '2025'), parseInt(orcamento.createAt?.toString().split('-')[1] ?? '07') - 1, parseInt(orcamento.createAt?.toString()?.split('-')[2] ?? '22')).toLocaleDateString(),
        }));
        this.loading = false;
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  deletar(id: string) {
    this.service.delete(id).subscribe({
      next: (response: boolean) => {
        if (response) {
          this.messageService.sucesso('Orçamento por projeto', 'Orçamento deletado com sucesso!');
          this.getOrcamentos();
        } else {
          this.messageService.erro('Orçamento por projeto', 'Erro ao tentar excluir o orçamento, por favor entre em contato com o suporte!');
        }
        this.loading = false;
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  ngOnInit() {
    this.getClientes();
    this.getProdutos();
    this.getOrcamentos();
  }
}
