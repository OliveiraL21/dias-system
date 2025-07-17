import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { CustomFilter } from 'src/app/models/customFilter/customFilter';
import { CustomButton } from 'src/app/models/custonsModels/CustomButtonData/CustomButton';
import Column from 'src/app/models/custonsModels/CustomTable/CustomColumn';
import { Produto } from 'src/app/models/produto/Produto';
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

  constructor(private service: ProdutoService, private router: Router) { }

  getCustomFilter(): CustomFilter[] {
    return [
      new CustomFilter('descricao', 'text', 'Informe o nome do produto', 'Produto', '', [], '', '', true),
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
      new Column("quantidade", "Quantidade", false),
      new Column("valor", "Valor", false)
    ]
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

  ngOnInit(): void {
    this.getProdutos();
  }
}
