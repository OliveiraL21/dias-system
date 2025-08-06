import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrcamentoPorProjetoListagemComponent } from './orcamento-por-projeto-listagem/orcamento-por-projeto-listagem.component';
import { OrcamentoPorProjetoCadastroComponent } from './orcamento-por-projeto-cadastro/orcamento-por-projeto-cadastro.component';

const routes: Routes = [
  { path: '', redirectTo: 'listagem', pathMatch: 'full' },
  { path: 'listagem', component: OrcamentoPorProjetoListagemComponent },
  { path: 'cadastro', component: OrcamentoPorProjetoCadastroComponent },
  { path: 'editar/:id', component: OrcamentoPorProjetoCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrcamentoPorProjetoRoutingModule { }
