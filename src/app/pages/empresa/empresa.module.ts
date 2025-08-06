import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { ShareModuleModule } from 'src/app/common/share-module/share-module.module';
import { EmpresaListagemComponent } from './empresa-listagem/empresa-listagem.component';
import { EmpresaCadastroComponent } from './empresa-cadastro/empresa-cadastro.component';


@NgModule({
  declarations: [
    EmpresaListagemComponent,
    EmpresaCadastroComponent,
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    ShareModuleModule,
  ]
})
export class EmpresaModule { }
