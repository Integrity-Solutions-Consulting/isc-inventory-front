import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomerDetailResponseDTO } from '../../../../core/models/ResponseDTO/administration/CustomerDetailResponseDTO';
import { FormService } from '../../../../core/services/modals/form/form.service';
import { LoadingService } from '../../../../core/services/modals/loading/loading.service';
import { ModalDialogService } from '../../../../core/services/modals/modalDialog/modalDialog.service';
import { WarningService } from '../../../../core/services/modals/warning/warning.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { EquipmentDismissalService } from '../../services/equipmentDismissal/equipmentDismissal.service';
import { EquipmentDismissalResponseDTO } from '../../../../core/models/ResponseDTO/inventory/EquipmentDismissalResponseDTO';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-equipment-dismissal',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    CommonModule,
    LayoutModule,
    MatCardModule,
    MatSortModule,
  ],
  templateUrl: './equipmentDismissal.component.html',
  styleUrls: ['./equipmentDismissal.component.css']
})
export class EquipmentDismissalComponent implements OnInit
{
  displayedColumns: string[] = [
    'categoryName',
    'equipmentItemCode',
    'dismissalType',
    'statusName',//
    'conditionName',
    'creationDate',
    'companyName',
  ];
dataSource = new MatTableDataSource<EquipmentDismissalResponseDTO>();
public searchTerm: string = '';
  total = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isSmallScreen: boolean = false;

  constructor
    (
      private breakpointObserver: BreakpointObserver,
      private loading: LoadingService,
      private formService: FormService,
      private modalDialogService: ModalDialogService,
      private warningService: WarningService,
      private equipmentDismissalService: EquipmentDismissalService,
      private router: Router,
      private dialog: MatDialog
    ) {}

    ngOnInit(): void
    {
    this.loadTable();

    this.breakpointObserver
      .observe([Breakpoints.Handset, '(max-width: 920px)'])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  loadTable(): void {
      this.loading.show(); // Show loading spinner
      this.equipmentDismissalService
        .getTable()
        .pipe(
          finalize(() => this.loading.hide()) // Siempre se ejecuta al final
        )
        .subscribe({
          next: (response) => {
            this.dataSource.data = response.data;
            console.log(response);
            this.total = this.dataSource.data.length;
            this.dataSource.paginator = this.paginator;
            this.dataSource.filterPredicate = (data, filter) => {
  const term = filter.trim().toLowerCase();
  return (
    data.categoryName?.toLowerCase().includes(term) ||
    data.companyName?.toLowerCase().includes(term) ||
    data.conditionName?.toLowerCase().includes(term) ||
    data.dismissalTypeName?.toLowerCase().includes(term) ||
    data.equipmentBrand?.toLowerCase().includes(term) ||
    data.equipmentItemCode?.toLowerCase().includes(term) ||
    data.equipmentSerialNumber?.toLowerCase().includes(term) ||
    data.statusName?.toLowerCase().includes(term) ||
    data.equipmentModel?.toLowerCase().includes(term)
  );
};
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

applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStatusClasses(statusName: string | undefined): string {
    if (!statusName) return 'dot-inactive out-of-service';
    switch (statusName.trim().toLowerCase()) {
      case 'disponible':
        return 'dot-available available';
      case 'asignado':
        return 'dot-assigned assigned';
      case 'en reparación':
        return 'dot-under-repair under-repair';
      case 'en revisión':
        return 'dot-under-review under-review';
      case 'falla reportada':
        return 'dot-bug-reported bug-reported';
      case 'reparado':
        return 'dot-repaired repaired';
      case 'fuera de servicio':
        return 'dot-out-of-service out-of-service';
      default:
        return 'dot-inactive out-of-service';
    }
  }

  getConditions(statusName: string | undefined): string {
    if (!statusName) return 'dot-inactive out-of-service';

    switch (statusName.trim().toLowerCase()) {
      case 'nuevo':
        return 'dot-new new';
      case 'como nuevo':
        return 'dot-like-new like-new';
      case 'usado':
        return 'dot-used used';
      case 'desgastado':
        return 'dot-worn-out worn-out';
      case 'Falla menor':
        return 'dot-minor-issue minor-issue';
      case 'Falla mayor':
        return 'dot-major-issue major-issue';
      case 'irreparable':
        return 'dot-unrepairable unrepairable';
      default:
        return 'dot-inactive out-of-service';
    }
  }

   onPageChange(event: PageEvent): void {
      console.log('Página cambiada:', event);
      // Implementar lógica si los datos vienen paginados desde el servidor
    }


}
