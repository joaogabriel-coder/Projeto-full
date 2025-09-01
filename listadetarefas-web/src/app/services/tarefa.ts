import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  // URL base da nossa API
  private apiUrl = 'http://localhost:8080/api/tarefas';

  // Injetamos o HttpClient para fazer requisições HTTP
  constructor(private http: HttpClient) {}

  // READ: Retorna a lista de tarefas
  getTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  // CREATE: Envia uma nova tarefa para a API
  addTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, tarefa);
  }

  // UPDATE: Atualiza uma tarefa existente
  updateTarefa(tarefa: Tarefa): Observable<Tarefa> {
    const url = `${this.apiUrl}/${tarefa.id}`;
    return this.http.put<Tarefa>(url, tarefa);
  }

  // DELETE: Deleta uma tarefa pelo seu ID
  deleteTarefa(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
