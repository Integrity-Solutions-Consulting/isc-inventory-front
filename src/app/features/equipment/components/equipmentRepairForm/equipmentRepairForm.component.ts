import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
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
import { SupplierTypeResponseDTO } from '../../../../core/models/ResponseDTO/inventory/SupplierTypeResponseDTO';
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
  equipment =
  {
    id: 0,
    serialNumber: '',
    equipmentStatusId: 0,
  };

supplierTypes: SupplierResponseDTO[] = [];

  isSubmitting = false;

  repairForm!: FormGroup;
  entityId: number = 0;

  revoke: boolean = false;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private warningService: WarningService,
    private repairSearvice: RepairService,
    private supplierService: SupplierService,
  ) {}


  ngOnInit() {
    this.initForm();
    this.loadSupplierTypes();
  }

  initForm() {
    this.repairForm = this.fb.group({
      description: [null, Validators.required],
      serviceProvider: [null, Validators.required],
      cost: [0.0, [Validators.min(0)]],
      supplierType: ['', Validators.required],
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
      this.repairForm.patchValue({...entityToEdit,supplierType: entityToEdit.supplierType?.id,
        description: entityToEdit.description,
        serviceProvider: entityToEdit.serviceProvider,
        cost: entityToEdit.cost,
      });
            this.entityId = entityToEdit.id;

    }
  }

  loadSupplierTypes(): void
  {
    const supplierTypeId = 2;
    this.supplierService.getSuppliersIdType(supplierTypeId).subscribe({

      next: (resp) => {
        this.supplierTypes = resp.data;
      },
      error: (err) => {
        console.error('Error cargando tipos de proveedor:', err);
      }
    });
  }

  onSubmit() {
    if (this.repairForm.invalid) return;

    this.isSubmitting = true;

    const formValue = this.repairForm.value;

    const request: EquipmentRepairRequestDTO = {
      description: formValue.description,
      supplierTypeId: formValue.serviceProvider || null,
      cost: formValue.cost,
      equipment: this.equipment.id,
      revoke: this.revoke,
    };
      const selectedSupplierType = this.supplierTypes.find(type => type.id === formValue.supplierType);

      if (!selectedSupplierType)
    {
    console.error('Tipo de proveedor no encontrado');
    this.isSubmitting = false;
    this.formService.error('Seleccione un tipo de proveedor válido');
    return;
  }

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
