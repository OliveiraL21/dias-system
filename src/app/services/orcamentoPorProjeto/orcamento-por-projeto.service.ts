import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrcamentoPorProjeto } from 'src/app/models/orcamentoPorProjeto/OrcamentoPorProjeto';
import { OrcamentoPorProjetoCreate } from 'src/app/models/orcamentoPorProjeto/OrcamentoPorProjetoCreate';
import { OrcamentoPorProjetoList } from 'src/app/models/orcamentoPorProjeto/OrcamentoPorProjetoList';
import { OrcamentoPorProjetoUpdate } from 'src/app/models/orcamentoPorProjeto/OrcamentoPorProjetoUpdate';
import { environment } from 'src/environments/environment';
const baseUrl = `${environment.api_url}/OrcamentoPorProjeto`;
@Injectable({
  providedIn: 'root'
})
export class OrcamentoPorProjetoService {

  constructor(private http: HttpClient) { }

  details(id: string): Observable<OrcamentoPorProjetoUpdate> {
    return this.http.get<OrcamentoPorProjetoUpdate>(`${baseUrl}/details/${id}`);
  }

  list(): Observable<OrcamentoPorProjetoList[]> {
    return this.http.get<OrcamentoPorProjetoList[]>(`${baseUrl}/list`);
  }

  create(data: any): Observable<OrcamentoPorProjetoCreate> {
    return this.http.post<OrcamentoPorProjetoCreate>(`${baseUrl}/create`, data);
  }

  update(id: string, data: any): Observable<OrcamentoPorProjetoUpdate> {
    return this.http.put<OrcamentoPorProjetoUpdate>(`${baseUrl}/update/${id}`, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${baseUrl}/delete/${id}`);
  }

  filtrar(numero: string, cliente: string): Observable<OrcamentoPorProjetoList[]> {
    let param = new HttpParams();

    if (numero) {
      param = param.set("numero", numero);
    }

    if (cliente) {
      param = param.set("cliente", cliente);
    }
    return this.http.get<OrcamentoPorProjetoList[]>(`${baseUrl}/filtrar`, { params: param });
  }
}
