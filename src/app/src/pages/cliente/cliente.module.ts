import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ShareModuleModule } from '../../common/share-module/share-module.module';
import { ClienteComponent } from './cliente.component';


@NgModule({
  declarations: [ClienteComponent],
  imports: [
    ClienteRoutingModule,
    ShareModuleModule
  ],
  exports: [
    ClienteComponent
  ]
})
export class ClienteModule { }
