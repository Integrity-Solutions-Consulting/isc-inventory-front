import { Component, OnInit } from '@angular/core';
import {
  MenuResponseDTO,
  PrivilegeResponseDTO,
  RoleRequestDTO,
} from '../../../../api';
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

@Component({
  selector: 'app-equipmentAssignmentForm',
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
    MatDatepickerModule
  ],
  templateUrl: './equipmentAssignmentForm.component.html',
  styleUrls: ['./equipmentAssignmentForm.component.css'],
})
export class EquipmentAssignmentFormComponent implements OnInit {
  employees: EmployeeCatalogResponseDTO[] = [];
  equipments: EquipmentResponseDTO[] = [];

  loading: boolean = true;
  isSubmitting = false;

  assignmentForm!: FormGroup;
  entityId: number = 0;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private equipmentService: EquipmentService,
    private equipmentAssignmentService: AssaingmentService,
    private formService: FormService
  ) {}

  ngOnInit() {
    this.initForm();
    forkJoin({
      employees: this.employeeService.getAll(),
      equipments: this.equipmentService.getAll(),
    }).subscribe({
      next: (resp) => {
        this.employees = resp.employees.data;
        this.equipments = resp.equipments.data;
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

  loadData() {
    const entityToEdit = this.formService.modalDataValue;
    if (entityToEdit) {
      this.assignmentForm.patchValue({
        employee: entityToEdit.employee?.id || null,
        equipment: entityToEdit.equipment?.id || null,
        assignmentDate: entityToEdit.assignmentDate?.split('T')[0],
      });
      this.entityId = entityToEdit.id;
    }
  }

  initForm() {
    this.assignmentForm = this.fb.group({
      employee: [null, Validators.required],
      equipment: [null, Validators.required],
      assignmentDate: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.assignmentForm.invalid) {
      this.assignmentForm.markAsTouched();
      return;
    }
    this.isSubmitting = true;
    const assignmentRequest: EquipmentAssignmentRequestDTO = {
      employee: this.assignmentForm.value.employee,
      equipment: this.assignmentForm.value.equipment,
      assigmentDate: this.assignmentForm.value.assignmentDate.format('YYYY-MM-DD'),
    };
    this.equipmentAssignmentService.save(assignmentRequest).subscribe({
      next: (resp) => {
        this.isSubmitting = false;
        this.formService.close(resp.data);
      },
      error: (error) => {
        console.error(error);
        this.isSubmitting = false;
        this.formService.error(error.error);
      },
    });
  }

  onCancel() {
    this.formService.close();
  }

}
