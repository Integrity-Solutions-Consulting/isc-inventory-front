import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentDetailResponseDTO } from '../../../../core/models/ResponseDTO/inventory/EquipmentDetailResponseDTO';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { WarrantyTypeFormComponent } from '../../components/warranty-type-form/warranty-type-form.component';
import { WarrantyService } from '../../services/warranty/warranty.service';

import { FormService } from '../../../../core/services/modals/form/form.service';
import { EquipmentInvoiceFormComponent } from '../../components/equipmentInvoiceForm/equipmentInvoiceForm.component';
import { WarrantTypeDetailResponseDTO } from '../../../../core/models/ResponseDTO/inventory/WarrantTypeDetailResponseDTO ';
import { WarrantTypeRequestDTO } from '../../../../core/models/RequestDTO/inventory/WarrantTypeRequestDTO';

import { InvoiceDetailResponseDTO } from '../../../../core/models/ResponseDTO/inventory/InvoiceDetailResponseDTO';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDialogService } from '../../../../core/services/modals/modalDialog/modalDialog.service';

@Component({
  selector: 'app-equipmentDetail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  templateUrl: './equipmentDetail.component.html',
  styleUrls: ['./equipmentDetail.component.css'],
})
export class EquipmentDetailComponent implements OnInit {
  @Input() equipmentId?: number;
  equipment?: EquipmentDetailResponseDTO;
  warrantyDetail?: WarrantTypeDetailResponseDTO;

  invoice?: InvoiceDetailResponseDTO;
  loading = true;

  dataSource = new MatTableDataSource<InvoiceDetailResponseDTO>();

  constructor(
    private route: ActivatedRoute,
    private equipmentService: EquipmentService,
    private warrantyService: WarrantyService,
    private modalDialogService: ModalDialogService,
    private formService: FormService,
    private location: Location,
    private dialog: MatDialog
  ) {}

  loadWarranty(equipmentId: number) {
    this.warrantyService.findById(equipmentId).subscribe({
      next: (resp) => {
        this.warrantyDetail = resp.data;
        this.isWarrantyActive();
      },
      error: () => {
        this.warrantyDetail = undefined;
      },
    });
  }

  ngOnInit() {
    const navigation = history.state as {
      equipment?: EquipmentDetailResponseDTO;
    };

    if (navigation.equipment) {
      this.equipment = navigation.equipment;
      this.loading = false;
      if (this.equipment?.warranty) {
        this.loadWarranty(this.equipment.warranty);
      }
    } else {
      const id =
        this.equipmentId ?? Number(this.route.snapshot.queryParamMap.get('id'));
      if (id) {
        this.equipmentService.getDetailById(id).subscribe({
          next: (resp) => {
            this.equipment = resp.data;
            this.loading = false;
            if (this.equipment?.warranty) {
              this.loadWarranty(this.equipment.warranty);
            }
          },
          error: (err) => {
            console.error('Error al cargar el detalle', err);
            this.loading = false;
          },
        });
      } else {
        this.loading = false;
      }
    }
  }

  calculateRemainingDays(endDate: string | Date): number {
    const today = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days >= 0 ? days : 0;
  }

  goBack() {
    this.location.back();
  }

  openWarrantyForm(): void {
  if (!this.equipment?.id) return;

  const newWarrantyData = {
    idEquipment: this.equipment.id,
  };

  this.formService.open(
    'Registrar detalle de garantía',
    'add_circle',
    WarrantyTypeFormComponent,
    newWarrantyData,
    (result: WarrantTypeDetailResponseDTO) => {
      if (result) {
        this.loadWarranty(this.equipment!.id); // <-- Actualiza la garantía
        this.modalDialogService.open(
          'success',
          'Garantía registrada',
          'La garantía fue registrada correctamente.'
        );
      }
    },
    (error) => {
      this.modalDialogService.open(
        'error',
        'Error al registrar',
        'No se pudo registrar la garantía.'
      );
    }
  );
}


  isWarrantyActive(): void {
    if (this.warrantyDetail) {
      const now = new Date();
      const endDate = new Date(this.warrantyDetail.warrantyEndDate);
      if (endDate < now) {
        this.warrantyDetail.warrantyStatus = false;
      }
    }
  }

  editWarranty(): void {
  if (!this.warrantyDetail|| !this.equipment?.id) return;

  const dataWithEquipmentId = {
    ...this.warrantyDetail,
    idEquipment: this.equipment.id // añade explícitamente el ID
  };
    console.log('Garantía para editar:', this.warrantyDetail);


  this.formService.open(
    'Editar Garantía',
    'edit',
    WarrantyTypeFormComponent,
    dataWithEquipmentId,
    (result: WarrantTypeDetailResponseDTO) => {
      if (result) {
        this.warrantyDetail = result;
        this.modalDialogService.open(
          'success',
          'Garantía actualizada',
          'La garantía fue modificada correctamente.'
        );
      }
    },
    (error) => {
      console.error('Error al actualizar la garantía', error);
      this.modalDialogService.open(
        'error',
        'Error al editar',
        'No se pudo actualizar la garantía.'
      );
    }
  );
}

  openInvoiceForm() {
    const invoice = {
      equipmentId: this.equipment?.id,
      invoiceDetail: this.invoice,
    };
    this.formService.open(
      'Registrar detalle de factura',
      'edit',
      EquipmentInvoiceFormComponent,
      invoice,
      (result: InvoiceDetailResponseDTO) => {
        if (result) {
          this.dataSource.data = [...this.dataSource.data, result];
          this.modalDialogService.open(
            'success',
            'Factura creada',
            'La factura fue creada correctamente.'
          );
        }
      },
      (error) => {
        this.modalDialogService.open(
          'error',
          'Error al crear',
          'Ocurrió un error al crear la factura.'
        );
      }
    );
  }
}
