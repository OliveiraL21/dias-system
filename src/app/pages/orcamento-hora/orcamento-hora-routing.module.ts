import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrcamentoHora } from 'src/app/models/orcamentoHora/OrcamentoHora';
import { OrcamentoHoraListagemComponent } from './orcamento-hora-listagem/orcamento-hora-listagem.component';
import { OrcamentoHoraCadastroComponent } from './orcamento-hora-cadastro/orcamento-hora-cadastro.component';

const routes: Routes = [
  { path: '', redirectTo: 'listagem', pathMatch: 'full' },
  { path: 'listagem', component: OrcamentoHoraListagemComponent },
  { path: 'cadastro', component: OrcamentoHoraCadastroComponent },
  { path: 'editar/:id', component: OrcamentoHoraCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrcamentoHoraRoutingModule { }
