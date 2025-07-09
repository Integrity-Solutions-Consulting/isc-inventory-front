import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { EmployeeService } from '../../../employees/services/employee.service';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { EquipmentAssignmentRequestDTO } from '../../../../core/models/RequestDTO/inventory/EquipmentAssignmentRequestDTO';
import { AssaingmentService } from '../../services/assaignment/assaingment.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EquipmentRequestDTO } from '../../../../core/models/RequestDTO/inventory/EquipmentRequestDTO';
import { ModalDialogService } from '../../../../core/services/modals/modalDialog/modalDialog.service';

@Component({
  selector: 'app-equipmentForm',
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
  templateUrl: './equipmentReturnForm.component.html',
  styleUrls: ['./equipmentReturnForm.component.css'],
})
export class EquipmentReturnFormComponent implements OnInit {

  isSubmitting = false;
  loading = true;

  equipmentForm!: FormGroup;
  entityId: number = 0;

  private _onDestroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private equipmentService: EquipmentService, 
    public modalDialog: ModalDialogService ) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  initForm() {
    this.equipmentForm = this.fb.group({
      dateReturn: [null]
    });
  }

loadData() {
  const entityToEdit = this.formService.modalDataValue;
}

  onSubmit() {
    if (this.equipmentForm.invalid) return;

    this.isSubmitting = true;

    const formValue = this.equipmentForm.value;

    const requestPayload: EquipmentRequestDTO = {
      condition: formValue.condition,
      company: formValue.company,
      brand: formValue.brand,
      model: formValue.model,
      serialNumber: formValue.serialNumber,
      itemCode: formValue.itemCode,
      categoryName: formValue.isCreatingNewCategory
        ? formValue.categoryName
        : '',
      equipmentCharacteristics: formValue.equipmentCharacteristics.map(
        (c: any) => ({
          id:c.id,
          component: c.component,
          description: c.description,
        })
      ),
      ...(formValue.isCreatingNewCategory
        ? {}
        : { categoryId: formValue.categoryId }),
    };

     if (this.entityId == 0) {
      this.equipmentService.save(requestPayload).subscribe({
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
    }else{
      this.equipmentService.update(requestPayload,this.entityId).subscribe({
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
  }

  onCancel() {
    this.formService.close();
  }

  close() {
    this.modalDialog.close();
  }
}
