import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tarea, Persona }  from '../interfaces/tarea.interface';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private tareas: Tarea[] = [];
  private tareasSubject = new BehaviorSubject<Tarea[]>(this.tareas)

  constructor() { }

  obtenerTareas() {
    return this.tareasSubject.asObservable();
  }

  agregarTarea(tarea: Tarea) {
    this.tareas.push(tarea);
    this.tareasSubject.next(this.tareas);
  }

}
