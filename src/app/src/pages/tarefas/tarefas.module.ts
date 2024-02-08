import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarefasRoutingModule } from './tarefas-routing.module';
import { ListagemTarefaComponent } from './listagem-tarefa/listagem-tarefa.component';
import { CadastroTarefaComponent } from './cadastro-tarefa/cadastro-tarefa.component';
import { ShareModuleModule } from '../../common/share-module/share-module.module';


@NgModule({
  declarations: [
    ListagemTarefaComponent,
    CadastroTarefaComponent
  ],
  imports: [
    ShareModuleModule,
    TarefasRoutingModule
  ]
})
export class TarefasModule { }
