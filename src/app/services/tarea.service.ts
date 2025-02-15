import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Tarea }  from '../interfaces/tarea.interface';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private tareas: Tarea[] = [];
  private tareasSubject = new BehaviorSubject<Tarea[]>([])
  tareas$ = this.tareasSubject.asObservable();

  constructor(private apiService: ApiService) { }

  marcarComoCompletada(tarea: Tarea) {
    const tareaEncontrada = this.tareas.find(t => t.nombre === tarea.nombre);
    if (tareaEncontrada) {
      tareaEncontrada.completada = !tareaEncontrada.completada;
      this.tareasSubject.next(this.tareas);
    }
  }
  
}
