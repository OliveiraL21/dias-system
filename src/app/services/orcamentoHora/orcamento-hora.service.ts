import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrcamentoHora } from 'src/app/models/orcamentoHora/OrcamentoHora';
import { OrcamentoHoraCreate } from 'src/app/models/orcamentoHora/OrcamentoHoraCreate';
import { OrcamentoHoraUpdate } from 'src/app/models/orcamentoHora/OrcamentoHoraUpdate';
import { environment } from 'src/environments/environment';
const baseUrl = `${environment.api_url}/OrcamentoHora`
@Injectable({
  providedIn: 'root'
})
export class OrcamentoHoraService {

  constructor(private http: HttpClient) { }

  details(id: string): Observable<OrcamentoHora> {
    return this.http.get<OrcamentoHora>(`${baseUrl}/details/${id}`);
  }

  filtrar(numero: number, clienteId: string): Observable<OrcamentoHora[]> {
    let param = new HttpParams();

    if (numero && numero > 0) {
      param = param.set('numero', numero);
    }

    if (clienteId) {
      param = param.set('clienteId', clienteId);
    }

    return this.http.get<OrcamentoHora[]>(`${baseUrl}/filtrar`, { params: param });
  }

  list(): Observable<OrcamentoHora[]> {
    return this.http.get<OrcamentoHora[]>(`${baseUrl}/list`);
  }

  create(orcamentoHora: OrcamentoHoraCreate): Observable<OrcamentoHoraCreate> {
    return this.http.post<OrcamentoHoraCreate>(`${baseUrl}/create`, orcamentoHora);
  }

  update(id: string, orcamentoHora: OrcamentoHoraUpdate): Observable<OrcamentoHoraUpdate> {
    return this.http.put<OrcamentoHoraUpdate>(`${baseUrl}/update/${id}`, orcamentoHora);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${baseUrl}/delete/${id}`);
  }
}
