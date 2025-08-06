import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = `${environment.api_url}/Report`

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient) { }

  servicosPrestados(projetoId: string): Observable<any> {
    return this.httpClient.get(`${baseUrl}/ServicosPrestados/${projetoId}`, { responseType: 'blob' });
  }

  servicosPrestadosPeriodo(projetoId: string, dataInicio: string, dataFim: string): Observable<any> {
    return this.httpClient.get(`${baseUrl}/ServicosPrestadosPeriodo/${projetoId}/${dataInicio}/${dataFim}`, { responseType: 'blob' });
  }

  orcamentoPorProjeto(orcamentoId: string): Observable<any> {
    return this.httpClient.get(`${baseUrl}/orcamentoPorProjeto/${orcamentoId}`, { responseType: 'blob' });
  }

  orcamentoHora(id: string): Observable<any> {
    return this.httpClient.get(`${baseUrl}/orcamentoHora/${id}`, { responseType: 'blob' });
  }
}
