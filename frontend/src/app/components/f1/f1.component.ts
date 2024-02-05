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
import { Router } from '@angular/router';

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
  isLoading: boolean = true; // Variable para controlar si se está cargando la información
  skeletonRows = Array(5).fill(0); // Array con 5 elementos para representar 5 filas en el skeleton screen

  constructor(private tribuService: TribuService, private dialog: MatDialog, private router: Router) {
    this.getData();
    this.dataSource = new MatTableDataSource<informacion>(this.ELEMENT_DATA); // Inicializa dataSource aquí
  }


  navigateTo(param: string) {
    this.router.navigate([param]);
  }
  async getData() {
    try {
      this.data = await this.tribuService.getDatos();
      this.isLoading = false;
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
    this.searchValue = event.target.value;
    this.applyFilter();
  }

  // Función para filtrar la tabla según el valor de búsqueda
  applyFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }

  onEdit(element: informacion) {
    this.tribuService.updateData = element;
    this.router.navigate(['/f2', { id: element.id }]);
  }


  openDeleteConfirmationDialog(element: informacion) {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      data: { productName: element.name }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(element)
        let res = this.tribuService.deleteDatos(element.id);
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== element.id);
      } 
    });
  }
}

