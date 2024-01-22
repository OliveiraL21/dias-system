import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ShareModuleModule } from '../../common/share-module/share-module.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRoutingModule,
    ShareModuleModule,
  ],

  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
