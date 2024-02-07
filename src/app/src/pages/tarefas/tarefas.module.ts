import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarefasRoutingModule } from './tarefas-routing.module';
import { ListagemTarefaComponent } from './listagem-tarefa/listagem-tarefa.component';
import { CadastroTarefaComponent } from './cadastro-tarefa/cadastro-tarefa.component';


@NgModule({
  declarations: [
    ListagemTarefaComponent,
    CadastroTarefaComponent
  ],
  imports: [
    CommonModule,
    TarefasRoutingModule
  ]
})
export class TarefasModule { }
