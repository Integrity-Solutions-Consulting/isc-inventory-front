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
import { MenuService } from '../../../menu/services/menu.service';
import { PrivilegeService } from '../../../privilege/services/privilege.service';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { FormService } from '../../../../core/services/modals/form/form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { forkJoin } from 'rxjs';
import { FlattenedMenu } from '../../../../core/models/ResponseDTO/authentication/FlattenedMenu';
import { EmployeeCatalogResponseDTO } from '../../../../core/models/ResponseDTO/administration/EmployeeCatalogResponseDTO';
import { EquipmentResponseDTO } from '../../../../core/models/ResponseDTO/inventory/EquipmentResponseDTO';
import { RoleService } from '../../../roles/services/role.service';
import { EmployeeService } from '../../../employees/services/employee.service';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { EquipmentAssignmentRequestDTO } from '../../../../core/models/RequestDTO/inventory/EquipmentAssignmentRequestDTO';
import { AssaingmentService } from '../../services/assaignment/assaingment.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EquipmentRepairRequestDTO } from '../../../../core/models/RequestDTO/inventory/EquipmentRepairRequestDTO';
import { RepairService } from '../../services/repair/repair.service';

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
  };

  isSubmitting = false;
  repairForm!: FormGroup;
  entityId: number = 0;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private repairSearvice: RepairService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.repairForm = this.fb.group({
      description: [null, Validators.required],
      serviceProvider: [null],
      cost: [0.0, [Validators.min(0)]],
    });
    this.loadData();
  }

  loadData() {
    const entityToEdit = this.formService.modalDataValue;
    if (entityToEdit) {
      this.equipment = {
        id: entityToEdit.equipmentId || entityToEdit.id,
        serialNumber: entityToEdit.serialNumber,
      };
      if (entityToEdit.equipmentId) {
        this.entityId = entityToEdit.id;
      }
      this.repairForm.patchValue({
        description: entityToEdit.description,
        serviceProvider: entityToEdit.serviceProvider,
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
      serviceProvider: formValue.serviceProvider || null,
      cost: formValue.cost,
      equipment: this.equipment.id,
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
  onCancel() {
    this.formService.close();
  }
}
