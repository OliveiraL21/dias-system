import { HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ShareModuleModule } from './src/common/share-module/share-module.module';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticateInterceptor } from './src/common/helpers/interceptors/authenticate.interceptor';



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
