import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from 'src/app/models/servico/Servico';
import { ServicoCreate } from 'src/app/models/servico/ServicoCreate';
import { ServicoUpdate } from 'src/app/models/servico/ServicoUpdate';
import { environment } from 'src/environments/environment';
const baseUrl = `${environment.api_url}/Servico`
@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) { }

  list(): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${baseUrl}/list`);
  }
  create(servico: ServicoCreate): Observable<ServicoCreate> {
    return this.http.post<ServicoCreate>(`${baseUrl}/create`, servico);
  }

  update(id: string, servico: ServicoUpdate): Observable<ServicoUpdate> {
    return this.http.put<ServicoUpdate>(`${baseUrl}/update/${id}`, servico);
  }

  details(id: string): Observable<Servico> {
    return this.http.get<Servico>(`${baseUrl}/details/${id}`);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${baseUrl}/delete/${id}`);
  }
}
