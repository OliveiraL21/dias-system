import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresa/Empresa';
import { EmpresaCreate } from 'src/app/models/empresa/EmpresaCreate';
import { EmpresaUpdate } from 'src/app/models/empresa/EmpresaUpdate';
import { environment } from 'src/environments/environment';
const baseUrl = `${environment.api_url}/Empresa`;
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  details(id: string): Observable<Empresa> {
    return this.http.get<Empresa>(`${baseUrl}/details/${id}`);
  }

  list(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${baseUrl}/list`);
  }

  create(empresa: EmpresaCreate): Observable<EmpresaCreate> {
    return this.http.post<EmpresaCreate>(`${baseUrl}/create`, empresa);
  }

  update(id: string, empresa: EmpresaUpdate): Observable<EmpresaUpdate> {
    return this.http.put<EmpresaUpdate>(`${baseUrl}/update/${id}`, empresa);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${baseUrl}/delete/${id}`);
  }

  filtrar(razaoSocial: string, cpf: string): Observable<Empresa[]> {
    let params = new HttpParams();
    if (razaoSocial) {
      params = params.set('razaoSocial', `%${razaoSocial}%`);
    }

    if (cpf) {
      params = params.set('cpf', cpf);
    }

    return this.http.get<Empresa[]>(`${baseUrl}/filtrar`, { params });
  }
}
