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

  servicosPrestadosPeriodo(projetoId: string, dataInicio: Date, dataFim: Date): Observable<any> {
    return this.httpClient.get(`${baseUrl}/ServicosPrestadosPeriodo/${projetoId}/${dataInicio.toLocaleDateString().replace("/", "-").replace("/", "-")}/${dataFim.toLocaleDateString().replace("/", "-").replace("/", "-")}`, { responseType: 'blob' });
  }

}
