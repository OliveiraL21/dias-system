import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrcamentoPorProjetoRoutingModule } from './orcamento-por-projeto-routing.module';
import { OrcamentoPorHoraCadastroComponent } from './orcamento-por-hora-cadastro/orcamento-por-hora-cadastro.component';
import { OrcamentoPorHoraListagemComponent } from './orcamento-por-hora-listagem/orcamento-por-hora-listagem.component';


@NgModule({
  declarations: [
    OrcamentoPorHoraCadastroComponent,
    OrcamentoPorHoraListagemComponent
  ],
  imports: [
    CommonModule,
    OrcamentoPorProjetoRoutingModule
  ]
})
export class OrcamentoPorProjetoModule { }
