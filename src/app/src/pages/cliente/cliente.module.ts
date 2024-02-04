import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ShareModuleModule } from '../../common/share-module/share-module.module';
import { ClienteComponent } from './cliente.component';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';


@NgModule({
  declarations: [ClienteComponent, ClienteCadastroComponent],
  imports: [
    ClienteRoutingModule,
    ShareModuleModule
  ],
  exports: [
    ClienteComponent,
    ClienteCadastroComponent
  ]
})
export class ClienteModule { }
