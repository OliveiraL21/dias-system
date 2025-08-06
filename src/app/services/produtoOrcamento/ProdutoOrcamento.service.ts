import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoOrcamento } from 'src/app/models/produtoOrcamento/ProdutoOrcamento';
import { ProdutoOrcamentoCreate } from 'src/app/models/produtoOrcamento/ProdutoOrcamentoCreate';
import { ProdutoOrcamentoUpdate } from 'src/app/models/produtoOrcamento/ProdutoOrcamentoUpdate';
import { environment } from 'src/environments/environment';
const baseUrl = `${environment.api_url}/ProdutoOrcamentoPorProjeto`

@Injectable({
  providedIn: 'root'
})
export class ProdutoOrcamentoService {

  constructor(private http: HttpClient) { }

  create(produto: ProdutoOrcamentoCreate): Observable<ProdutoOrcamentoCreate> {
    return this.http.post<ProdutoOrcamentoCreate>(`${baseUrl}/create`, produto);
  }

  update(id: string, produto: ProdutoOrcamentoUpdate): Observable<ProdutoOrcamentoUpdate> {
    return this.http.put<ProdutoOrcamentoUpdate>(`${baseUrl}/update/${id}`, produto);
  }

  details(id: string): Observable<ProdutoOrcamento> {
    return this.http.get<ProdutoOrcamento>(`${baseUrl}/details/${id}`);
  }

  list(): Observable<ProdutoOrcamento[]> {
    return this.http.get<ProdutoOrcamento[]>(`${baseUrl}/list`);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${baseUrl}/delete/${id}`);
  }
}
