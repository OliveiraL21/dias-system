import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjetoListagem, Projeto } from 'src/app/models/projeto/projeto';
import { environment } from 'src/environments/environment';

const url = `${environment.api_url}/`;

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor(private http: HttpClient) { }
  listaTodos(): Observable<ProjetoListagem[]> {
    return this.http.get<ProjetoListagem[]>(`${url}lista/projetos`);
  }

  listaDashboardProjects(): Observable<ProjetoListagem[]> {
    return this.http.get<ProjetoListagem[]>(`${url}lista_dashboard`);
  }

  listaSimples(): Observable<any[]> {
    return this.http.get<any[]>(`${url}lista_simples`);
  }

  filtrar(projeto?: string, cliente?: string, status?: string): Observable<ProjetoListagem[]> {
    return this.http.get<ProjetoListagem[]>(`${url}Projeto/filtrar_projetos?projeto=${projeto}&cliente=${cliente}&status=${status}`);
  }

  create(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>(`${url}projeto/create`, projeto);
  }

  update(id: string, projeto: Projeto): Observable<Projeto> {
    return this.http.put<Projeto>(`${url}projeto/update/${id}`, projeto);
  }

  details(id: string): Observable<Projeto> {
    return this.http.get<Projeto>(`${url}projeto/details/${id}`);
  }

  delete(id: string): Observable<Projeto> {
    return this.http.delete<Projeto>(`${url}projeto/delete/${id}`);
  }
}
