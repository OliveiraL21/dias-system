import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UsuarioLogin } from 'src/app/models/login/UsuarioLogin';
import { environment } from 'src/environments/environment';


const url = `${environment.api_usuario_url}/login`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(usuario: UsuarioLogin): Observable<any> {
    return this.http.post<any>(`${url}`, usuario).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    )
  }

}
