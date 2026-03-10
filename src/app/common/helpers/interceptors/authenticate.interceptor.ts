import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token-service/token.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticateInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.split('/')[1] == environment.api_usuario_url.split('/')[1]) {
      return next.handle(req);
    }

    const token = this.tokenService.getToken();
    if (token) {

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          token: `${token}`
        }
      });

    }
    return next.handle(req);
  }

}

