import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario';

import { environment } from 'src/environments/environment';

const baseUrl = `${environment.api_usuario_url}/Usuario`;

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient) { }

  create(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${baseUrl}`, usuario);
  }

  details(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${baseUrl}/detalhes/${id}`);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${baseUrl}/update`, usuario);
  }

  recuperarUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${baseUrl}/Recuperar`);
  }

  uploadImage(formData: FormData, id: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/UpdateProfileImage/${id}`, formData);
  }

  getUserPerfileimg(fileName: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/profilepicture/${fileName}`);
  }

}
