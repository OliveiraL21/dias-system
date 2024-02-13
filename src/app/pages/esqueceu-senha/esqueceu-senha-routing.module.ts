import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EsqueceuSenhaComponent } from './esqueceu-senha.component';

const routes: Routes = [
  { path: '', component: EsqueceuSenhaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsqueceuSenhaRoutingModule { }
