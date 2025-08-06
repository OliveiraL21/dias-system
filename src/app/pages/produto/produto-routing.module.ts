import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoListagemComponent } from './produto-listagem/produto-listagem.component';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'listagem', pathMatch: 'full'
  },
  {
    path: 'listagem', component: ProdutoListagemComponent,
  },
  { path: 'cadastro', component: ProdutoCadastroComponent },
  { path: 'editar/:id', component: ProdutoCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
