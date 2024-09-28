import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TareaService } from 'src/app/services/tarea.service';

function validarNombresUnicos(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const personas = control.value;
    const nombres = personas.map((persona: any) => persona.nombre);
    const validarNombresUnicos = new Set(nombres);

    return nombres.length !== validarNombresUnicos.size ? { nombresDuplicados: true } : null;
  };
}

@Component({
  selector: 'app-tarea-form',
  templateUrl: './tarea-form.component.html',
  styleUrls: ['./tarea-form.component.css']
})
export class TareaFormComponent implements OnInit {
  tareaForm!: FormGroup;

  constructor(private fb: FormBuilder, private tareaService: TareaService) { }

  ngOnInit(): void {
    this.tareaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      fechaLimite: ['', Validators.required],
      personas: this.fb.array([], validarNombresUnicos()),
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
    // this.tareaForm.updateValueAndValidity();
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
      // console.log(this.tareaForm.value);
      this.tareaService.agregarTarea(this.tareaForm.value);
      this.tareaForm.reset();
    }
  }

}
