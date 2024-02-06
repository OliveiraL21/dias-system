import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from 'src/app/src/models/status/status';
import { environment } from 'src/environments/environment';

const url = `${environment.api_url}/Status`;

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }
  listaTodos(): Observable<Status[]> {
    return this.http.get<Status[]>(`${url}/listaStatus`);
  }
}
