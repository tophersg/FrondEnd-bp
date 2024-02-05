import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms'; // Importa FormBuilder y Validators
import { informacion } from '../../interface/informacion.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TribuService } from '../../services/tribu.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-f2',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatDatepickerModule],
  templateUrl: './f2.component.html',
  styleUrls: ['./f2.component.css']
})
export class F2Component {

  formData: informacion;
  today: string;
  isUpdating: boolean = false;
  f2Form: FormGroup;
  update_date_revision: any;
  update_date_release: any;
  constructor(private formBuilder: FormBuilder, private tribuService: TribuService, private route: ActivatedRoute) {
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
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        // Estamos actualizando un elemento existente
        this.isUpdating = true;
        console.log("🚀 ~ F2Component ~ ngOnInit ~  this.tribuService.updateData:", this.tribuService.updateData)

        // Parsear las fechas en el formato deseado
        const dateRelease = new Date(this.tribuService.updateData.date_release).toISOString().split('T')[0];
        const dateRevision = new Date(this.tribuService.updateData.date_revision).toISOString().split('T')[0];

        // Actualizar el formulario con las nuevas fechas
        this.f2Form.patchValue({
          id: this.tribuService.updateData.id,
          name: this.tribuService.updateData.name,
          description: this.tribuService.updateData.description,
          logo: this.tribuService.updateData.logo,
          date_release: dateRelease,
          date_revision: dateRevision
        });
        this.formData = this.f2Form.value;

        // Aquí puedes cargar los datos del elemento con el ID proporcionado y establecerlos en this.formData
      }
    });
  }
  // Getter conveniente para acceder a los controles del formulario
  get f() { return this.f2Form.controls; }

  async onSubmit() {
    this.update_date_revision = await this.updateDate(this.formData.date_revision)
    this.update_date_release = await this.updateDate(this.formData.date_release)
    this.setF2Form();
    if (this.f2Form.invalid) {
      Swal.fire({
        icon: "error",
        text: "Por favor, valide los campos.",
      });
      return;
    }
    if (this.isUpdating) {
      let response: any = await this.tribuService.updateDatos(this.formData)
      console.log("🚀 ~ F2Component ~ onSubmit ~ response:", response)
      if (response) {
        Swal.fire("Datos Actualizados!");
      }
    } else {

      let response: any = await this.tribuService.postDatos(this.formData)
      if (response) {
        Swal.fire(" Agregar Completado!");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ID ya se encuentra en uso!",
        });
      }
    }


  }
  setF2Form() {
    this.f2Form.setValue({
      id: this.formData.id,
      name: this.formData.name,
      description: this.formData.description,
      logo: this.formData.logo,
      date_release: this.update_date_release,
      date_revision: this.update_date_revision
    });

  }

  onReset() {
    this.f2Form.reset({ emitEvent: false });
    this.formData = { id: '', name: '', description: '', logo: '', date_release: '', date_revision: '' };
  }

  async updateDate(fechaR: string) {
    const fecha = new Date(fechaR);
    fecha.setUTCHours(12);

    // Obtener componentes de la fecha
    const year = fecha.getUTCFullYear();
    const month = ("0" + (fecha.getUTCMonth() + 1)).slice(-2);
    const day = ("0" + fecha.getUTCDate()).slice(-2);

    // Construir la cadena de texto en el formato deseado
    const fechaFormateada = `${year}-${month}-${day}`;

    return fechaFormateada;
  }
}
