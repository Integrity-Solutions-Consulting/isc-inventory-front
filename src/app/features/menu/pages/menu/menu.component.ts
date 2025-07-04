import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { LoadingService } from '../../../../core/services/modals/loading/loading.service';
import { finalize } from 'rxjs';
import { FormService } from '../../../../core/services/modals/form/form.service';

import { ModalDialogService } from '../../../../core/services/modals/modalDialog/modalDialog.service';
import { WarningService } from '../../../../core/services/modals/warning/warning.service';
import { MenuResponseDTO } from '../../../../core/models/ResponseDTO/MenuResponseDTO'; // ajusta el path
import { MenuService } from '../../services/menu.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-menu',
  standalone:true,
  imports: [
      MatTableModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      FormsModule,
      CommonModule,
      LayoutModule,
      MatCardModule,
    ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  searchTerm: string = '';
  displayedColumns: string[] = [
    'label', 
    'route', 
    'icon', 
    'active', 
    'actions'];
  dataSource = new MatTableDataSource<MenuResponseDTO>();
  total = 0;
  isSmallScreen: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private menuService: MenuService,
    private breakpointObserver: BreakpointObserver,
    private loading: LoadingService,
    private formService: FormService,
    private modalDialogService: ModalDialogService,
    private warningService: WarningService
  ) {}

  ngOnInit() {
    this.loadMenus();

    this.breakpointObserver
      .observe([Breakpoints.Handset, '(max-width: 920px)'])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }

  loadMenus(): void {
      this.loading.show(); // Show loading spinner
      this.menuService
        .getAll()
        .pipe(
          finalize(() => this.loading.hide()) // Siempre se ejecuta al final
        )
        .subscribe({
          next: (response) => {
            this.dataSource.data = response.data;
            this.total = this.dataSource.data.length;
            this.dataSource.paginator = this.paginator;
          },
          error: (err) => {
            console.error('Error loading table', err);
            this.loading.hide(); // Hide loading spinner on error
          },
          complete: () => {
            this.loading.hide(); // Hide loading spinner on complete
          },
        });
    }
  
    create(): void {
      this.formService.open(
        'Nuevo Rol',
        'person_add',
        RolFormComponent,
        null,
        (result: RolesResponseDTO) => {
          if (result) {
            console.log(result);
            this.dataSource.data = [...this.dataSource.data, result];
            this.modalDialogService.open(
              'success',
              'Rol creado',
              'El rol fue registrado correctamente.'
            );
          }
        },
        (error) => {
          console.error('Ocurrió un error al guardar', error);
          this.modalDialogService.open(
            'error',
            'Error al guardar',
            'Ocurrió un error al guardar el rol.'
          );
        }
      );
    }
  
    edit(user: RolesResponseDTO): void {
      this.formService.open(
        'Editar Rol',
        'edit',
        RolFormComponent,
        user,
        (result: RolesResponseDTO) => {
          if (result) {
            const index = this.dataSource.data.findIndex(
              (u) => u.id === result.id
            );
            if (index !== -1) {
              this.dataSource.data[index] = result;
              this.dataSource.data = [...this.dataSource.data]; // Reasignar para que se actualice la tabla
            }
            this.modalDialogService.open(
              'success',
              'Rol actualizado',
              'El rol fue actualizado correctamente.'
            );
          }
        },
        (error) => {
          console.error('Error al editar el rol', error);
          this.modalDialogService.open(
            'error',
            'Error al editar',
            'No se pudo actualizar el rol.'
          );
        }
      );
    }
  
    warningDelete(entity: RolesResponseDTO) {
        this.warningService.open(
          'Confirmar eliminación',
          '¿Estás seguro que deseas eliminar este elemento? Esta acción no se puede deshacer.',
          () => {
            this.delete(entity);
          }
        );
      }
    
      delete(entity: RolesResponseDTO): void {
        this.loading.show();
        this.roleService.delete(entity.id).subscribe({
          next: (resp) => {
            const index = this.dataSource.data.findIndex((u) => u.id === entity.id);
            if (index !== -1) {
              this.dataSource.data[index].active = false;
              this.dataSource.data = [...this.dataSource.data];
            }
            this.loading.hide();
            this.modalDialogService.open(
              'success',
              'Rol Desactivado',
              'El rol fue desactivado correctamente.'
            );
          },
          error: (error) => {
            this.loading.hide();
            this.modalDialogService.open('error', 'Error', error.error.message);
          },
        });
      }

}
