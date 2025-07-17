import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutoListagemComponent } from './produto-listagem/produto-listagem.component';
import { ShareModuleModule } from 'src/app/common/share-module/share-module.module';


@NgModule({
  declarations: [
    ProdutoCadastroComponent,
    ProdutoListagemComponent
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    ShareModuleModule
  ]
})
export class ProdutoModule { }
