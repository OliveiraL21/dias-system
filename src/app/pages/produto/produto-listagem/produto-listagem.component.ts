import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { CustomFilter } from 'src/app/models/customFilter/customFilter';
import { CustomButton } from 'src/app/models/custonsModels/CustomButtonData/CustomButton';
import Column from 'src/app/models/custonsModels/CustomTable/CustomColumn';
import { Produto } from 'src/app/models/produto/Produto';
import { MensagemService } from 'src/app/services/message/Mensagem.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';

@Component({
  selector: 'app-produto-listagem',
  templateUrl: './produto-listagem.component.html',
  styleUrl: './produto-listagem.component.css',
  providers: [ConfirmationService]
})
export class ProdutoListagemComponent {
  loading: boolean = false;
  produtos: Produto[] = [];

  constructor(private service: ProdutoService, private router: Router, private messageService: MensagemService) { }

  getCustomFilter(): CustomFilter[] {
    return [
      new CustomFilter('descricao', 'text', 'ex: Formatação', 'Produto', '', [], '', '', true),
    ]
  }

  getCustomButton(): CustomButton {
    return new CustomButton("Novo Produto", true, "", "primary", "pi pi-plus", "novo produto");

  }

  novo(data: any) {
    this.router.navigateByUrl("produto/cadastro");
  }

  getCustonColums(): Column[] {
    return [
      new Column("descricao", "Descrição", true),
      new Column("valor", "Valor", false)
    ]
  }

  deletar(id: string) {
    this.service.delete(id).subscribe({
      next: (response: boolean) => {
        if (response) {
          this.messageService.sucesso('Produto', 'Produto deletado com sucesso!');
          this.getProdutos();
        } else {
          this.messageService.erro('Produto', 'Erro ao tentar excluir o produto, por favor entre em contato com o suporte!');
        }
        this.loading = false;
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  getProdutos() {
    this.loading = true;
    this.service.list().subscribe({
      next: (response: Produto[]) => {
        this.produtos = response;
        this.loading = false;
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  filter(data: any) {
    this.loading = true;
    if (data) {
      this.service.filter(data.descricao).subscribe({
        next: (response: Produto[]) => {
          this.produtos = response;
          this.loading = false;
        }, error: (erro: HttpErrorResponse) => {
          this.loading = false;
        }
      })
    }
  }

  ngOnInit(): void {
    this.getProdutos();
  }
}
