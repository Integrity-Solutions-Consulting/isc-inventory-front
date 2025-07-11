import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormService } from '../../../../core/services/modals/form/form.service';
import { SupplierRequestDTO } from '../../../../core/models/RequestDTO/inventory/SupplierRequestDTO';
import { SupplierService } from '../../services/supplier/supplier.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-supllierForm',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner
],
  templateUrl: './supplierForm.component.html',
  styleUrls: ['./supplierForm.component.css']
})
export class SupplierFormComponent implements OnInit {
  supplierForm!: FormGroup;
  loading: boolean = true;
  isSubmitting: boolean = false;
  supplierId: number = 0;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private supplierService: SupplierService
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.supplierForm = this.fb.group({
      businessName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      taxId: ['', [Validators.required, Validators.pattern(/^\d{10,13}$/)]]
    });
  }

  loadData(): void {
    const supplierToEdit = this.formService.modalDataValue;
    if (supplierToEdit) {
      this.supplierForm.patchValue(supplierToEdit);
      this.supplierId = supplierToEdit.id;
    }
  }

  onSubmit(): void {
    if (this.supplierForm.invalid) {
      this.supplierForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const supplierRequest: SupplierRequestDTO = this.supplierForm.value;

    if (this.supplierId !== 0) {
      this.supplierService.update(supplierRequest, this.supplierId).subscribe({
        next: (resp) => {
          this.isSubmitting = false;
          this.formService.close(resp.data);
        },
        error: (err) => {
          console.error(err);
          this.isSubmitting = false;
          this.formService.error(err.error);
        }
      });
    } else {
      this.supplierService.create(supplierRequest).subscribe({
        next: (resp) => {
          this.isSubmitting = false;
          this.formService.close(resp.data);
        },
        error: (err) => {
          console.error(err);
          this.isSubmitting = false;
          this.formService.error(err.error);
        }
      });
    }
  }

  onCancel(): void {
    this.formService.close();
  }

}
