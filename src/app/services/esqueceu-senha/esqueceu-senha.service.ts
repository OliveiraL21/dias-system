import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResetSenha } from 'src/app/src/models/redefinirSenha/resetSenha';
import { environment } from 'src/environments/environment';

const baseUrl = `${environment.api_usuario_url}`;

@Injectable({
  providedIn: 'root'
})
export class EsqueceuSenhaService {

  constructor(private httpClient: HttpClient) { }


  solicitarResetSenha(email: any): Observable<any> {
    return this.httpClient.post<any>(`${baseUrl}/solicitarSenha`, email);
  }

  redefinirSenha(reset: ResetSenha): Observable<any> {
    return this.httpClient.post<any>(`${baseUrl}/efetuarResetSenha`, reset);
  }
}
