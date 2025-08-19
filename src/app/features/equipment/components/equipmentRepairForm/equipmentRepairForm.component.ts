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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { FormService } from '../../../../core/services/modals/form/form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EquipmentRepairRequestDTO } from '../../../../core/models/RequestDTO/inventory/EquipmentRepairRequestDTO';
import { RepairService } from '../../services/repair/repair.service';
import { WarningService } from '../../../../core/services/modals/warning/warning.service';
import { SupplierRequestDTO } from '../../../../core/models/RequestDTO/inventory/SupplierRequestDTO';
import { Subject } from 'rxjs';
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
    MatProgressSpinnerModule,
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
  loading = true;
  repairForm!: FormGroup;
  entityId: number = 0;
  isEditMode: boolean = false;

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
    private repairService: RepairService,
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
  }

  loadData() {
    const entityToEdit = this.formService.modalDataValue;
    console.log('Datos recibidos en el formulario: ', entityToEdit);
    
    this.isEditMode = !!entityToEdit?.id && entityToEdit.id > 0;

    if (this.isEditMode) {
      console.log('Modo EDICIÓN activado');
      this.entityId = entityToEdit.id;
      this.equipment = {
        id: entityToEdit.equipment?.id || entityToEdit.equipment || entityToEdit.id,
        serialNumber: entityToEdit.serialNumber || '',
        equipmentStatusId: entityToEdit.repairStatus?.id || 0,
      };

      this.repairForm.patchValue({
        description: entityToEdit.description || '',
        serviceProvider: entityToEdit.serviceProvider || '',
        cost: entityToEdit.cost || 0,
        supplierType: entityToEdit.supplierType?.id || '',
      });
    } else {
      console.log('Modo CREACIÓN activado');
      this.entityId = 0;
      this.equipment = {
        id: entityToEdit?.equipment || entityToEdit?.id,
        serialNumber: entityToEdit?.serialNumber || entityToEdit?.itemCode || '',
        equipmentStatusId: entityToEdit?.equipmentStatusId || 0,
      };
      this.repairForm.reset({
        description: '',
        serviceProvider: '',
        cost: 0,
        supplierType: '',
      });
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
      equipment: this.equipment.id,
      description: formValue.description,
      serviceProvider: formValue.serviceProvider,
      cost: formValue.cost,
      revoke: this.revoke,
    };
    const selectedSupplierType = this.supplierTypes.find(type => type.id === formValue.supplierType);

    if (!selectedSupplierType) {
      console.error('Tipo de proveedor no encontrado');
      this.isSubmitting = false;
      this.formService.error('Seleccione un tipo de proveedor válido');
      return;
    }

    if(this.isEditMode && this.entityId > 0) {
        this.repairService.update(this.entityId, request).subscribe({
          next: (response) => {
            this.isSubmitting = false;
            this.formService.close(response.data);
          },
          error: (error) => {
            this.isSubmitting = false;
            this.formService.error(error.error);
          },
        });
      } else {
      this.repairService.save(request).subscribe({
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

  getSupplierNameById(id: number): string {
    return this.suppliers.find(s => s.id === id)?.businessName || '';
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

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  preventInvalidInput(event: KeyboardEvent) {
    if (['e', 'E', '+', '-'].includes(event.key)) {
      event.preventDefault();
    }
  }
}
