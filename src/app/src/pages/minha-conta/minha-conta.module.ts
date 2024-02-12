import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinhaContaRoutingModule } from './minha-conta-routing.module';
import { MinhaContaComponent } from './minha-conta.component';
import { ShareModuleModule } from '../../common/share-module/share-module.module';


@NgModule({
  declarations: [
    MinhaContaComponent
  ],
  imports: [
    ShareModuleModule,
    MinhaContaRoutingModule
  ]
})
export class MinhaContaModule { }
