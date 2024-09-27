import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tarea-form',
  templateUrl: './tarea-form.component.html',
  styleUrls: ['./tarea-form.component.css']
})
export class TareaFormComponent implements OnInit {
  tareaForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.tareaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      fechaLimite: ['', Validators.required],
      personas: this.fb.array([]),
    });
  }

  get personas() {
    return this.tareaForm.get('personas') as FormArray;
  }

  nuevaPersona(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      edad: ['', [Validators.required, Validators.min(18)]],
      habilidades: this.fb.array([this.nuevaHabilidad()]),
    });
  }

  agregarPersona() {
    this.personas.push(this.nuevaPersona());
  }

  eliminarPersona(indice: number) {
    this.personas.removeAt(indice);
  }

  nuevaHabilidad(): FormControl {
    return this.fb.control('', Validators.required);
  }

  agregarHabilidad(indicePersona: number) {
    const habilidades = this.personas.at(indicePersona).get('habilidades') as FormArray;
    habilidades.push(this.nuevaHabilidad());
  }

  eliminarHabilidad(indicePersona: number, indiceHabilidad: number) {
    const habilidades = this.personas.at(indicePersona).get('habilidades') as FormArray;
    habilidades.removeAt(indiceHabilidad);
  }

  getHabilidades(indicePersona: number): FormArray {
    return this.personas.at(indicePersona).get('habilidades') as FormArray;
  }

  onSubmit() {
    if (this.tareaForm.valid) {
      console.log(this.tareaForm.value);
    }
  }
}
