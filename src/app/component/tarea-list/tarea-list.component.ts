import { Component, OnInit } from '@angular/core';
import { TareaService } from 'src/app/services/tarea.service';
import { Tarea, Persona } from 'src/app/interfaces/tarea.interface';

@Component({
  selector: 'app-tarea-list',
  templateUrl: './tarea-list.component.html',
  styleUrls: ['./tarea-list.component.css']
})
export class TareaListComponent implements OnInit {
  tareas: Tarea[] = [];
  criterioOrden: string = 'prioridad';
  filtro : string = 'todas'; 

  constructor(private tareaService: TareaService) { }

  ngOnInit(): void {
    this.tareaService.obtenerTareas().subscribe(tareas => {
      // console.log(tareas);
      this.tareas = tareas; 
      this.ordenarTareas();
    })
  }

  obtenerTareasFiltradas(): Tarea[] {
    if (this.filtro === 'completadas') {
      return this.tareas.filter(tarea => tarea.completada);
    } else if  (this.filtro === 'pendientes') { 
      return this.tareas.filter(tarea => !tarea.completada);
    }
    return this.tareas;
  }

  marcarTareaComoCompletada(tarea: Tarea) {
    tarea.completada = !tarea.completada;
    // this.tareasSubject.next(this.tareas);
  }

  ordenarTareas() {
    // console.log('Tareas antes de ordenar:', this.tareas);
    const selectElement = document.getElementById('ordenar') as HTMLSelectElement;
    this.criterioOrden = selectElement.value;

    switch (this.criterioOrden) {
      case 'prioridad':
        const prioridades = { 'Alta': 3, 'Media': 2, 'Baja': 1 };
        this.tareas.sort((a, b) => prioridades[b.prioridad] - prioridades[a.prioridad]);
        break;
      case 'fechaCreacion':
        this.tareas.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime());
        break;
      case 'fechaVencimiento':
        this.tareas.sort((a, b) => new Date(a.fechaLimite).getTime() - new Date(b.fechaLimite).getTime());
        break;
    }
    // console.log('Tareas después de ordenar:', this.tareas);
  }

}
