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
import { SupplierTypeResponseDTO } from '../../../../core/models/ResponseDTO/inventory/SupplierTypeResponseDTO';
import { SupplierTypeService } from '../../services/supplier/supplier-type.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { SupplierTypeRequestDTO } from '../../../../core/models/RequestDTO/inventory/SupplierTypeRequestDTO';

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
    MatProgressSpinner,
    MatSelectModule,
    MatOptionModule
],
  templateUrl: './supplierForm.component.html',
  styleUrls: ['./supplierForm.component.css']
})
export class SupplierFormComponent implements OnInit {
  supplierForm!: FormGroup;
  loading: boolean = true;
  isSubmitting: boolean = false;
  supplierId: number = 0;
  supplierTypes: SupplierTypeResponseDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private supplierService: SupplierService,
    private supplierTypeService: SupplierTypeService
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadSupplierTypes();
    this.loadData();
  }

  initForm(): void {
    this.supplierForm = this.fb.group({
      businessName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      taxId: ['', [Validators.required, Validators.pattern(/^\d{10,13}$/)]],
      supplierType: ['', Validators.required]
    });
  }

  loadData(): void {
    const supplierToEdit = this.formService.modalDataValue;
    if (supplierToEdit)
      {
      this.supplierForm.patchValue({...supplierToEdit,supplierType: supplierToEdit.supplierType?.id
      });
            this.supplierId = supplierToEdit.id;

    }
    this.loading = false;
  }

  loadSupplierTypes(): void {
    this.supplierTypeService.getAllActive().subscribe({
      next: (resp) => {
        this.supplierTypes = resp.data;
      },
      error: (err) => {
        console.error('Error cargando tipos de proveedor:', err);
      }
    });
  }



  onSubmit(): void {
  if (this.supplierForm.invalid) {
    this.supplierForm.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;
  const formValue = this.supplierForm.value;

  // Buscar el tipo de proveedor completo en el array
  const selectedSupplierType = this.supplierTypes.find(type => type.id === formValue.supplierType);

  if (!selectedSupplierType) {
    console.error('Tipo de proveedor no encontrado');
    this.isSubmitting = false;
    this.formService.error('Seleccione un tipo de proveedor válido');
    return;
  }

  // Crear el DTO de solicitud con el objeto completo
  const supplierRequest: SupplierRequestDTO = {
    businessName: formValue.businessName,
    address: formValue.address,
    phone: formValue.phone,
    email: formValue.email,
    taxId: formValue.taxId,
    supplierType: selectedSupplierType // Enviamos el objeto completo
  };

  console.log('Enviando al backend:', supplierRequest); // Para depuración

  const serviceCall = this.supplierId !== 0
    ? this.supplierService.update(supplierRequest, this.supplierId)
    : this.supplierService.create(supplierRequest);

  serviceCall.subscribe({
    next: (resp) => {
      this.isSubmitting = false;
      this.formService.close(resp.data);
    },
    error: (err) => {
      console.error('Error detallado:', {
        status: err.status,
        message: err.message,
        error: err.error,
        url: err.url
      });
      this.isSubmitting = false;
      this.formService.error(err.error?.message || 'Error al guardar el proveedor');
    }
  });
}

  onCancel(): void {
    this.formService.close();
  }

}
