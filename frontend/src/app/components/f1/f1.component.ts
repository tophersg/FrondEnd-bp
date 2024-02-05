import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TribuService } from '../../services/tribu.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { informacion } from '../../interface/informacion.interface';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalDeleteComponent } from '../../common/modal-delete/modal-delete.component';

@Component({
  selector: 'app-f1',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule
  ],
  templateUrl: './f1.component.html',
  styleUrls: ['./f1.component.css'],
})

export class F1Component implements AfterViewInit {
  data: informacion[] = []; // Variable para almacenar los datos recibidos
  ELEMENT_DATA: informacion[] = [];
  searchValue: string = ''; // Variable para almacenar el valor de búsqueda

  constructor(private tribuService: TribuService, private dialog: MatDialog) {
    this.getData();
    this.dataSource = new MatTableDataSource<informacion>(this.ELEMENT_DATA); // Inicializa dataSource aquí
  }

  async getData() {
    try {
      this.data = await this.tribuService.getDatos(2);
      console.log("Datos recibidos:", this.data);
      // Asignar this.data a ELEMENT_DATA
      this.ELEMENT_DATA = this.data;
      // Actualizar dataSource con los nuevos datos
      this.dataSource.data = this.ELEMENT_DATA;
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  }

  displayedColumns: string[] = ['logo', 'name', 'description', 'date_revision', 'date_release', 'id'];
  dataSource: MatTableDataSource<informacion>; // Inicializa dataSource aquí

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Inicialización en el constructor

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  reload() {
    this.getData();
  }


  // Función que se ejecuta cuando cambia el valor del campo de búsqueda
  onSearchChange(event: any) {
    // Actualiza el valor de búsqueda y filtra la tabla
    this.searchValue = event.target.value;
    this.applyFilter();
  }

  // Función para filtrar la tabla según el valor de búsqueda
  applyFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }

  onEdit(id: any) {
    // Lógica para editar el elemento con el ID proporcionado
    console.log('Editar elemento con ID:', id);
  }

  onDelete(id: any) {
    // Lógica para eliminar el elemento con el ID proporcionado
    console.log('Eliminar elemento con ID:', id);
  }

  openDeleteConfirmationDialog(element: informacion) {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      data: { productName: element.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(element)
        let res = this.tribuService.deleteDatos(element.id);
        console.log("🚀 ~ F1Component ~ dialogRef.afterClosed ~ res:", res)
        
        // El usuario confirmó la eliminación, realiza la acción de eliminación aquí
      } else {
        // El usuario canceló la eliminación
      }
    });
  }
}

