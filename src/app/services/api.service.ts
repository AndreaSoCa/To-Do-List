import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Ajusta según el puerto del backend

  constructor(private http: HttpClient) { }

  getTareas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tareas`);
  }

  addTarea(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tareas`, data);
  }

  updateTarea(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tareas/${id}`, data);
  }

  deleteTarea(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tareas/${id}`);
  }
}
