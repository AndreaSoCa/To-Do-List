export interface Persona {
  nombre: string;
  edad: number;
  habilidades: string[];
}

export interface Tarea {
  nombre: string;
  fechaLimite: string;
  fechaCreacion: string;
  completada: boolean;
  prioridad: 'Alta' | 'Media' | 'Baja';
  personas: Persona[];
}
