import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaListagemComponent } from './empresa-listagem/empresa-listagem.component';
import { EmpresaCadastroComponent } from './empresa-cadastro/empresa-cadastro.component';

const routes: Routes = [
  { path: "", redirectTo: "listagem", pathMatch: "full" },
  { path: "listagem", component: EmpresaListagemComponent },
  { path: "cadastro", component: EmpresaCadastroComponent },
  { path: "editar/:id", component: EmpresaCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
