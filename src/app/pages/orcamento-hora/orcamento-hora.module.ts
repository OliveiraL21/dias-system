import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrcamentoHoraRoutingModule } from './orcamento-hora-routing.module';
import { OrcamentoHoraCadastroComponent } from './orcamento-hora-cadastro/orcamento-hora-cadastro.component';
import { OrcamentoHoraListagemComponent } from './orcamento-hora-listagem/orcamento-hora-listagem.component';
import { ShareModuleModule } from 'src/app/common/share-module/share-module.module';


@NgModule({
  declarations: [
    OrcamentoHoraCadastroComponent,
    OrcamentoHoraListagemComponent
  ],
  imports: [
    CommonModule,
    OrcamentoHoraRoutingModule,
    ShareModuleModule
  ]
})
export class OrcamentoHoraModule { }
