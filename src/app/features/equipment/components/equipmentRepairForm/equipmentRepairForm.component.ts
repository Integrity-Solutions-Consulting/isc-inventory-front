import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { FormService } from '../../../../core/services/modals/form/form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EquipmentRepairRequestDTO } from '../../../../core/models/RequestDTO/inventory/EquipmentRepairRequestDTO';
import { RepairService } from '../../services/repair/repair.service';
import { WarningService } from '../../../../core/services/modals/warning/warning.service';
import { SupplierRequestDTO } from '../../../../core/models/RequestDTO/inventory/SupplierRequestDTO';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { SupplierService } from '../../../suppliers/services/supplier/supplier.service';
import { SupplierResponseDTO } from '../../../../core/models/ResponseDTO/inventory/SupplierResponseDTO';

@Component({
  selector: 'app-equipmentRepairForm',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinner,
    NgxMatSelectSearchModule,
    MatDatepickerModule,
  ],
  templateUrl: './equipmentRepairForm.component.html',
  styleUrls: ['./equipmentRepairForm.component.css'],
})
export class EquipmentRepairFormComponent implements OnInit {
  equipment = {
    id: 0,
    serialNumber: '',
    equipmentStatusId: 0,
  };


  isSubmitting = false;
  loading = true;
  repairForm!: FormGroup;
  entityId: number = 0;

  suppliers: SupplierRequestDTO[] = [];
  suppliersFilterCtrl = new FormControl();
  filteredSuppliers: any[] = [];

  private _onDestroy = new Subject<void>();

  revoke: boolean = false;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private suppliersService: SupplierService,
    private warningService: WarningService,
    private repairSearvice: RepairService
  ) {}


  ngOnInit() {
    this.initForm();
    forkJoin({
          suppliers: this.suppliersService.getAll(),
        }).subscribe({
          next: (resp) => {
            this.suppliers = resp.suppliers.data.filter((supplier: SupplierResponseDTO) => 
          supplier.supplierType?.id === 2);
            this.filteredSuppliers = this.suppliers.slice();
            this.suppliersFilterCtrl.valueChanges
              .pipe(takeUntil(this._onDestroy))
              .subscribe(() => {
                this.filterSuppliers();
              });
          },
          error: (err) => {
            console.error('Error al cargar datos:', err);
          },
          complete: () => {
            this.loading = false;
            this.loadData();
          },
        });
  }

  filterSuppliers() {
    const search = this.suppliersFilterCtrl.value?.toLowerCase() || '';
    this.filteredSuppliers = this.suppliers.filter((sup) =>
      `${sup.businessName} ${sup.id}`.toLowerCase().includes(search)
    );
  }

  initForm() {
    this.repairForm = this.fb.group({
      description: [null, Validators.required],
      supplier: [null, Validators.required],
      cost: [0.0, [Validators.min(0)]],
    });
    this.loadData();
  }

  loadData() {
    const entityToEdit = this.formService.modalDataValue;
    console.log(entityToEdit);
    if (entityToEdit) {
      this.equipment = {
        id: entityToEdit.equipmentId || entityToEdit.id,
        serialNumber: entityToEdit.serialNumber,
        equipmentStatusId: entityToEdit.equipmentStatusId || 0,
      };
      if (entityToEdit.equipmentId) {
        this.entityId = entityToEdit.id;
      }
      this.repairForm.patchValue({
        description: entityToEdit.description,
        supplier: entityToEdit.serviceProvider,
        cost: entityToEdit.cost,
      });
    }
  }

  onSubmit() {
    if (this.repairForm.invalid) return;

    this.isSubmitting = true;

    const formValue = this.repairForm.value;

    const request: EquipmentRepairRequestDTO = {
      description: formValue.description,
      serviceProvider: formValue.supplier || null,
      cost: formValue.cost,
      equipment: this.equipment.id,
      revoke: this.revoke,
    };
    if (this.entityId == 0) {
      this.repairSearvice.save(request).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.formService.close(response.data);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.formService.error(error.error);
        },
      });
    }
  }

  submitAndRepair() {
    if (this.equipment.equipmentStatusId == 2) {
      this.warningService.open(
        'Confirmar devolución',
        'Este equipo está asignado a un usuario. ¿Desea realizar la devolución automática?',
        () => {
          this.revoke = true;
          this.onSubmit();
        },
        () => {
          this.revoke = false;
          this.onSubmit();
        },
        'Sí, continuar',
        'Continuar sin devolución'
      );
    } else {
      this.onSubmit();
    }
  }

  onCancel() {
    this.formService.close();
  }
}
