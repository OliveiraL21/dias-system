import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrcamentoPorProjetoRoutingModule } from './orcamento-por-projeto-routing.module';
import { OrcamentoPorProjetoListagemComponent } from './orcamento-por-projeto-listagem/orcamento-por-projeto-listagem.component';
import { OrcamentoPorProjetoCadastroComponent } from './orcamento-por-projeto-cadastro/orcamento-por-projeto-cadastro.component';
import { ShareModuleModule } from 'src/app/common/share-module/share-module.module';


@NgModule({
  declarations: [
    OrcamentoPorProjetoListagemComponent,
    OrcamentoPorProjetoCadastroComponent
  ],
  imports: [
    CommonModule,
    OrcamentoPorProjetoRoutingModule,
    ShareModuleModule
  ]
})
export class OrcamentoPorProjetoModule { }
