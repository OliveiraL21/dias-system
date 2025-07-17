import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/models/produto/Produto';
import { ProdutoCreate } from 'src/app/models/produto/ProdutoCreate';
import { ProdutoUpdate } from 'src/app/models/produto/ProdutoUpdate';
import { environment } from 'src/environments/environment';

const baseUrl = `${environment.api_url}/Produto`;

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  list(): Observable<Produto[]> {
    return this.http.get<Produto[]>(baseUrl);
  }

  create(produto: ProdutoCreate): Observable<ProdutoCreate> {
    return this.http.post<ProdutoCreate>(`${baseUrl}/create`, produto);
  }

  update(produto: ProdutoUpdate): Observable<ProdutoUpdate> {
    return this.http.put<ProdutoUpdate>(`${baseUrl}/update/${produto.id}`, produto);
  }

  details(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${baseUrl}/details/${id}`);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/delete/${id}`);
  }

  filter(descricao: string): Observable<Produto[]> {
    let param = new HttpParams();
    if (descricao) {
      param = param.set("descricao", descricao);
    }

    return this.http.get<Produto[]>(`${baseUrl}/filter`, { params: param });
  }
}
