import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetoRoutingModule } from './projeto-routing.module';
import { ShareModuleModule } from '../../common/share-module/share-module.module';
import { ListagemProjetoComponent } from './listagem-projeto/listagem-projeto.component';
import { CadastroProjetoComponent } from './cadastro-projeto/cadastro-projeto.component';


@NgModule({
  declarations: [
    ListagemProjetoComponent,
    CadastroProjetoComponent
  ],
  imports: [
    ShareModuleModule,
    ProjetoRoutingModule
  ]
})
export class ProjetoModule { }
