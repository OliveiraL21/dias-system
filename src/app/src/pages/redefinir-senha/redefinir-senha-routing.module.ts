import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedefinirSenhaComponent } from './redefinir-senha.component';

const routes: Routes = [
  { path: ':id/:email/:codigo', component: RedefinirSenhaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedefinirSenhaRoutingModule { }
