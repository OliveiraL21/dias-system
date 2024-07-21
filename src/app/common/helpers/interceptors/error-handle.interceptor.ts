import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { LogoutService } from 'src/app/services/logout/logout.service';
import { TokenService } from 'src/app/services/token-service/token.service';

@Injectable()
export class errorHandleInterceptor implements HttpInterceptor {

  constructor(private router: Router, private logoutService: LogoutService, private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.logoutService.logoutUsuario().subscribe({
            next: (response: any) => {
              this.tokenService.clearStorage();
              this.router.navigateByUrl("login");
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
