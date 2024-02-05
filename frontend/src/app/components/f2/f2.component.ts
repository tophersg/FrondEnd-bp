import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms'; // Importa FormBuilder y Validators
import { informacion } from '../../interface/informacion.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-f2',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatDatepickerModule],
  templateUrl: './f2.component.html',
  styleUrls: ['./f2.component.css']
})
export class F2Component {
  formData: informacion; // Definimos el objeto formData como una instancia de informacion
  today: string;
  f2Form: FormGroup; // Definimos un FormGroup para el formulario

  constructor(private formBuilder: FormBuilder) {
    // Inicializamos el formulario en el constructor
    this.today = new Date().toISOString().split('T')[0];
    this.formData = { id: '', name: '', description: '', logo: '', date_release: '', date_revision: '' };
    this.f2Form = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: [this.today, Validators.required],
      date_revision: ['', Validators.required]
    });
  }

  // Getter conveniente para acceder a los controles del formulario
  get f() { return this.f2Form.controls; }

  onSubmit() {
    // Verificamos la validez del formulario antes de enviarlo
    if (this.f2Form.invalid) {
      console.log('Datos del formulario:', this.formData);
      return;
    }

    // Lógica para enviar el formulario
    console.log('Formulario enviado:', this.formData);
    // Aquí puedes agregar la lógica para enviar los datos al servicio correspondiente
  }

  onReset() {
    // Lógica para restablecer el formulario
    this.f2Form.reset({ emitEvent: false }); // Restablecer el formulario sin emitir eventos
    this.formData = { id: '', name: '', description: '', logo: '', date_release: '', date_revision: '' }; // Limpiar el objeto formData
  }
}
