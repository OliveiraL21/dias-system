import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovoUsuarioRoutingModule } from './novo-usuario-routing.module';
import { NovoUsuarioComponent } from './novo-usuario.component';
import { ShareModuleModule } from '../../common/share-module/share-module.module';


@NgModule({
  declarations: [
    NovoUsuarioComponent
  ],
  imports: [
    CommonModule,
    NovoUsuarioRoutingModule,
    ShareModuleModule
  ],
  exports: [
    NovoUsuarioComponent
  ]
})
export class NovoUsuarioModule { }
