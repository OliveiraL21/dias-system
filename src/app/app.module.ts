import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticateInterceptor } from './common/helpers/interceptors/authenticate.interceptor';
import { ShareModuleModule } from './common/share-module/share-module.module';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareModuleModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticateInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
