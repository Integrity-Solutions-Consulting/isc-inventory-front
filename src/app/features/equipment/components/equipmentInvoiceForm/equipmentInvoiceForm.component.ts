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
import { CommonModule, Location } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { FormService } from '../../../../core/services/modals/form/form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AssaingmentService } from '../../services/assaignment/assaingment.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ModalDialogService } from '../../../../core/services/modals/modalDialog/modalDialog.service';
import { InvoiceDetailRequestDTO } from '../../../../core/models/RequestDTO/inventory/InvoiceDetailRequestDTO';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { EquipmentRevokeRequestDTO } from '../../../../core/models/RequestDTO/inventory/EquipmentRevokeRequestDTO';
import { EquipmentService } from '../../services/equipment/equipment.service';

@Component({
  selector: 'app-InvoiceForm',
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
  templateUrl: './equipmentInvoiceForm.component.html',
  styleUrls: ['./equipmentInvoiceForm.component.css'],
})
export class EquipmentInvoiceFormComponent implements OnInit, OnDestroy {
  isSubmitting = false;
  loading = true;

  equipmentInvoiceForm!: FormGroup;
  entityId: number = 0;
  equipmentId: number = 0;

  private _onDestroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private equipmentService: EquipmentService,
    public modalDialog: ModalDialogService,
    private location: Location
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadData();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  initForm() {
    this.equipmentInvoiceForm = this.fb.group({
      description: ['', Validators.required],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      tax: [0, [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.required, Validators.min(0)]],
      subtotal: [0, [Validators.min(0)]],
      total: [0, [Validators.min(0)]]
      }); 
  }

  loadData() {
    const data  = this.formService.modalDataValue;
    this.equipmentId = data.equipmentId;
    if (data.invoiceDetail) {
      this.entityId = data.invoiceDetail.id;
      this.equipmentInvoiceForm.patchValue({
        description: data.invoiceDetail.description,
        unitPrice: data.invoiceDetail.unitPrice,
        quantity: data.invoiceDetail.quantity,
        tax: data.invoiceDetail.tax,
        discount: data.invoiceDetail.discount,
        subtotal: data.invoiceDetail.subtotal,
        total: data.invoiceDetail.total
      });
    }
    this.loading = false;
  }

  onSubmit() {
    if (this.equipmentInvoiceForm.invalid) return;
    this.isSubmitting = true;
    const formValue = this.equipmentInvoiceForm.getRawValue();

    const request: InvoiceDetailRequestDTO = {
      description: formValue.description,
      unitPrice: formValue.unitPrice,
      quantity: formValue.quantity,
      subtotal: formValue.subtotal,
      tax: formValue.tax,
      discount: formValue.discount,
      total: formValue.total
    };
    this.equipmentService.invoice(request , this.equipmentId).subscribe({
      next: (resp) => {
        this.isSubmitting = false;
        this.formService.close(resp.data);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.formService.error(error.error);
      },
    });
  }

  onCancel() {
    this.formService.close();
  }

  goBack() {
    this.location.back();
  }
}
