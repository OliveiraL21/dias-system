import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemTarefaComponent } from './listagem-tarefa/listagem-tarefa.component';
import { CadastroTarefaComponent } from './cadastro-tarefa/cadastro-tarefa.component';

const routes: Routes = [
  { path: 'listagem', component: ListagemTarefaComponent },
  { path: 'cadastro', component: CadastroTarefaComponent },
  { path: 'editar/:id', component: CadastroTarefaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarefasRoutingModule { }
