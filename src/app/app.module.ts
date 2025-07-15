import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticateInterceptor } from './common/helpers/interceptors/authenticate.interceptor';
import { ShareModuleModule } from './common/share-module/share-module.module';
import { errorHandleInterceptor } from './common/helpers/interceptors/error-handle.interceptor';
import { MessageService } from 'primeng/api';
import { OrcamentoHoraCadastroComponent } from './pages/orcamento-hora/orcamento-hora-cadastro/orcamento-hora-cadastro.component';
import { OrcamentoHoraListagemComponent } from './pages/orcamento-hora/orcamento-hora-listagem/orcamento-hora-listagem.component';





@NgModule({
  declarations: [
    AppComponent,
    OrcamentoHoraCadastroComponent,
    OrcamentoHoraListagemComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareModuleModule,
  ],
  providers: [
    AuthenticateInterceptor, { provide: HTTP_INTERCEPTORS, useClass: AuthenticateInterceptor, multi: true },
    errorHandleInterceptor, { provide: HTTP_INTERCEPTORS, useExisting: errorHandleInterceptor, multi: true },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
