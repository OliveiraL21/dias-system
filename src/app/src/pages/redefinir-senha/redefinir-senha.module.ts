import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedefinirSenhaRoutingModule } from './redefinir-senha-routing.module';
import { ShareModuleModule } from '../../common/share-module/share-module.module';
import { RedefinirSenhaComponent } from './redefinir-senha.component';


@NgModule({
  declarations: [RedefinirSenhaComponent],
  imports: [
    RedefinirSenhaRoutingModule,
    ShareModuleModule
  ],

  exports: [
    RedefinirSenhaComponent
  ]
})
export class RedefinirSenhaModule { }
