import { WarrantyService } from './../../services/warranty/warranty.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { Inject } from '@angular/core';
import { LoadingService } from '../../../../core/services/modals/loading/loading.service';




import { FormService } from '../../../../core/services/modals/form/form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { forkJoin } from 'rxjs';
import { FlattenedMenu } from '../../../../core/models/ResponseDTO/authentication/FlattenedMenu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EquipmentService } from '../../services/equipment/equipment.service'; // ajusta ruta si es distinta


@Component({
  selector: 'app-warranty-type-form',
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
      NgxMatSelectSearchModule,
      MatDatepickerModule,
    ],
      templateUrl: './warranty-type-form.component.html',
      styleUrls: ['./warranty-type-form.component.css'],
})
export class WarrantyTypeComponent implements OnInit {
  warrantyForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WarrantyTypeComponent>,
    private warrantyService: WarrantyService,
    private loading: LoadingService,
    private equipmentService: EquipmentService,
    @Inject(MAT_DIALOG_DATA) public data: { equipmentId: number }
  ) {}

  ngOnInit(): void {
    this.warrantyForm = this.fb.group({
      conditions: ['', [Validators.required, Validators.maxLength(255)]],
      warrantyStartDate: [null, Validators.required],
      warrantyEndDate: [null, Validators.required],
      SupportContact: ['', [Validators.required, Validators.maxLength(100)]],

    });
  }

 onSubmit(): void {
  if (this.warrantyForm.invalid) return;

  const payload = {
    ...this.warrantyForm.value,
    id_equipment: this.data.equipmentId,
    warrantyStartDate: this.warrantyForm.value.warrantyStartDate.toISOString(),
    warrantyEndDate: this.warrantyForm.value.warrantyEndDate.toISOString(),
  };

  this.loading.show();

  this.equipmentService.setWarranty(payload, this.data.equipmentId).subscribe({
    next: () => {
      this.loading.hide();
      this.dialogRef.close(true); // cerrar modal exitosamente
    },
    error: (error) => {
      this.loading.hide();
      console.error('Error al guardar la garantía', error);
      this.dialogRef.close(false);
    },
  });
}


  onCancel(): void {
    this.dialogRef.close();
  }
}
