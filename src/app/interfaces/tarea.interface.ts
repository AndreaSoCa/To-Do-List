export interface Persona {
    nombre: string;
    edad: number;
    habilidades: string[];
}

export interface Tarea {
    nombre: string;
    fechaLimite: string;
    completada: boolean;
    personas: Persona[];
}