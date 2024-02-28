import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ShareModuleModule } from 'src/app/common/share-module/share-module.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    ShareModuleModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
