import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemProjetoComponent } from './listagem-projeto/listagem-projeto.component';
import { CadastroProjetoComponent } from './cadastro-projeto/cadastro-projeto.component';

const routes: Routes = [
  { path: '', component: ListagemProjetoComponent },
  { path: 'listagem', component: ListagemProjetoComponent },
  { path: 'cadastro', component: CadastroProjetoComponent },
  { path: 'editar/:id', component: CadastroProjetoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetoRoutingModule { }
