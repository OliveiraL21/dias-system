import { HttpClient, HttpParams } from '@angular/common/http';
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

  filtrar(razaoSocial: string, cnpj: string): Observable<Cliente[]> {
    let param = new HttpParams();
    if (razaoSocial) {
      param = param.set('razaoSocial', razaoSocial);
    }

    if (cnpj) {
      param = param.set('cnpj', cnpj);
    }

    return this.http.get<Cliente[]>(`${url}/filtrar`, { params: param });
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

  update(id: string, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${url}/update/${id}`, cliente);
  }

  details(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${url}/details/${id}`);
  }

  delete(id: string | null): Observable<any> {
    return this.http.delete<any>(`${url}/delete/${id}`);
  }

}
