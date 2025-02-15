export interface Persona {
  nombre: string;
  edad: number;
  habilidades: string[];
}

export interface Tarea {
  _id: string;
  nombre: string;
  fechaLimite: string;
  fechaCreacion: string;
  completada: boolean;
  prioridad: 'Alta' | 'Media' | 'Baja';
  personas: Persona[];
}
