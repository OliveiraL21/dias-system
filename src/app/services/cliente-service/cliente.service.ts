import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Cliente from 'src/app/models/cliente/cliente';
import { environment } from 'src/environments/environment';

const url = `${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  constructor(private http: HttpClient) { }

  filtrar(razaoSocial: string, cnpj: string, email: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${url}/filtrar/${razaoSocial}/${cnpj}/${email}`);
  }

  listarTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${url}/lista`);
  }

  listaSimples(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${url}/lista-simples`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${url}/create`, cliente);
  }

  update(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${url}/update/${id}`, cliente);
  }

  details(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${url}/details/${id}`);
  }

  delete(id: number | null): Observable<any> {
    return this.http.delete<any>(`${url}/delete/${id}`);
  }

}
