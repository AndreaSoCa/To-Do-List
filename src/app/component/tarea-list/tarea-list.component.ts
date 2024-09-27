import { Component, OnInit } from '@angular/core';
import { TareaService } from 'src/app/services/tarea.service';
import { Tarea, Persona } from 'src/app/interfaces/tarea.interface';

@Component({
  selector: 'app-tarea-list',
  templateUrl: './tarea-list.component.html',
  styleUrls: ['./tarea-list.component.css']
})
export class TareaListComponent implements OnInit {
  tareas: Tarea[] = [
    {
      nombre: 'Tarea 1',
      fechaLimite: '2024-03-20',
      completada: false,
      personas: [
        { nombre: 'Prueba1', edad: 18, habilidades: ['Angular'] },
        { nombre: 'Prueba2', edad: 18, habilidades: ['Angular'] }
      ]
    },
    {
      nombre: 'Tarea 2',
      fechaLimite: '2024-10-20',
      completada: true,
      personas: [
        { nombre: 'Prueba1', edad: 18, habilidades: ['Angular'] },
        { nombre: 'Prueba2', edad: 18, habilidades: ['Angular'] }
      ]
    }
  ];

  //Estado del filtro
  filtro : string = 'todas'; 

  constructor(private tareaService: TareaService) { }

  ngOnInit(): void {
    this.tareaService.obtenerTareas().subscribe(tareas => {
      this.tareas = tareas; 
    })
  }

  //Filtar las tareas por estado
  obtenerTareasFiltradas(): Tarea[] {
    if (this.filtro === 'completadas') {
      return this.tareas.filter(tarea => tarea.completada);
    } else if  (this.filtro === 'pendientes') { 
      return this.tareas.filter(tarea => !tarea.completada);
    }
    return this.tareas;
  }

}
