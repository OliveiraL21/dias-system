import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EsqueceuSenhaRoutingModule } from './esqueceu-senha-routing.module';
import { EsqueceuSenhaComponent } from './esqueceu-senha.component';
import { ShareModuleModule } from '../../common/share-module/share-module.module';


@NgModule({
  declarations: [EsqueceuSenhaComponent],
  imports: [
    EsqueceuSenhaRoutingModule,
    ShareModuleModule
  ],
  exports: [
    EsqueceuSenhaComponent
  ]
})
export class EsqueceuSenhaModule { }
