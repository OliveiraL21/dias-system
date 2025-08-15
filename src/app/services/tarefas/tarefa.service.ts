import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa, TarefaListagem } from 'src/app/models/tarefa/tarefa';
import { environment } from 'src/environments/environment';

const url = `${environment.api_url}/Tarefa`;

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }
  listaTodos(): Observable<TarefaListagem[]> {
    return this.http.get<TarefaListagem[]>(`${url}`);
  }

  listByProjeto(projeto: string): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${url}/lista/projeto/${projeto}`);
  }

  getByProjeto(pageNumber: number, pageSize: number, projeto: string): Observable<any> {
    return this.http.get<any>(`${url}/projeto/${projeto}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  filtrar(descricao?: string, dataInicio?: string, dataFim?: string, projeto?: string, statusId?: string): Observable<TarefaListagem[]> {
    return this.http.get<TarefaListagem[]>(`${url}/filtrar?descricao=${descricao}&dataInicio=${dataInicio}&dataFim=${dataFim}&projetoId=${projeto}&statusId=${statusId}`);
  }
  create(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${url}`, tarefa);
  }

  update(id: string, tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${url}/update_tarefas/${id}`, tarefa);
  }

  details(id: string): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${url}/detalhes_tarefas/${id}`);
  }
  calcularDuracao(horarioInicio: string, horarioFIm: string): Observable<any> {
    return this.http.get<any>(`${url}/duracao/${horarioInicio}/${horarioFIm}`);
  }

  calcularTotaisHoras(data: string): Observable<any> {
    return this.http.get<any>(`${url}/horasTotais/${data}`);
  }

  excluirTarefa(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${url}/${id}`);
  }
}
