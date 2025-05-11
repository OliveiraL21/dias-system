import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { LogoutService } from 'src/app/services/logout/logout.service';
import { MensagemService } from 'src/app/services/message/Mensagem.service';
import { TokenService } from 'src/app/services/token-service/token.service';

@Injectable()
export class errorHandleInterceptor implements HttpInterceptor {

  constructor(private router: Router, private logoutService: LogoutService, private tokenService: TokenService, private messageService: MensagemService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const isLoginPage = this.router.url.includes('login');
        if ((error.status === 401 || error.status === 403 || error.status === 0) && !isLoginPage) {
          this.logoutService.logoutUsuario().subscribe({
            next: (response: any) => {
              this.tokenService.clearStorage();
              this.router.navigateByUrl("login");
              this.messageService.aviso("Sessão encerrada", "Sessão expirada, por favor faça o login novamente")
              return throwError("");
            },
            error: () => {
              this.tokenService.clearStorage();
              this.router.navigateByUrl("login");
              return throwError("");
            }
          });
        }
        return throwError("");
      })
    )
  }

};
