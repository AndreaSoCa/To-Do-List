import { Component, OnInit } from '@angular/core';
import { TareaService } from 'src/app/services/tarea.service';
import { ApiService } from 'src/app/services/api.service';
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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getTareas().subscribe(tareas => {
      console.log("Tareas cargadas:", tareas);
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

  eliminarTarea(_id: string): void {
    console.log('ID recibido para eliminar:', _id);
  
    if (_id) {
      this.apiService.deleteTarea(_id).subscribe(() => {
        console.log('Tarea eliminada correctamente');
        this.apiService.getTareas();
      });
    } else {
      console.log('No se recibió un ID válido');
    }
  }
  

}
