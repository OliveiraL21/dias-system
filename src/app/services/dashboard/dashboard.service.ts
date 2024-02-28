import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const url = `${environment.api_url}/geral/Dashboard`;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  carregarDados(): Observable<any> {
    return this.http.get<any>(`${url}/CarregarDados`);
  }
}
