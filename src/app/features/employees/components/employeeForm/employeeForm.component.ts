import { Component, OnInit } from '@angular/core';
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
import { FormService } from '../../../../core/services/modals/form/form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { forkJoin } from 'rxjs';
import { GenderService } from '../../../../core/services/gender/gender.service';
import { NationalityService } from '../../../../core/services/nationality/nationality.service';
import { IndentificationTypeService } from '../../../../core/services/indentificationType/indentificationType.service';
import { PositionService } from '../../../../core/services/position/position.service';
import { WorkModeService } from '../../../../core/services/workMode/workMode.service';
import { IdentificationTypeResponseDTO } from '../../../../core/models/ResponseDTO/administration/IdentificationTypeResponseDTO';
import { GenderResponseDTO } from '../../../../core/models/ResponseDTO/administration/GenderResponseDTO';
import { PositionResponseDTO } from '../../../../core/models/ResponseDTO/administration/PositionResponseDTO';
import { WorkModeResponseDTO } from '../../../../core/models/ResponseDTO/administration/WorkModeResponseDTO';
import { NationalityResponseDTO } from '../../../../core/models/ResponseDTO/administration/NationalityResponseDTO';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EmployeeRequestDTO } from '../../../../core/models/RequestDTO/administration/EmployeeRequestDTO';
import { EmployeeService } from '../../services/employee.service';
import moment from 'moment';

@Component({
  selector: 'app-employeeForm',
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
    MatDatepickerModule,
  ],
  templateUrl: './employeeForm.component.html',
  styleUrls: ['./employeeForm.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  loading: boolean = true;
  isSubmitting = false;

  entityForm!: FormGroup;
  entityId: number = 0;

  identificationTypes: IdentificationTypeResponseDTO[] = ([] = []);
  genders: GenderResponseDTO[] = [];
  positions: PositionResponseDTO[] = [];
  workModes: WorkModeResponseDTO[] = [];
  nationalities: NationalityResponseDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private genderService: GenderService,
    private nationalityService: NationalityService,
    private identificationTypeService: IndentificationTypeService,
    private positionService: PositionService,
    private workModeService: WorkModeService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.initForm();
    forkJoin({
      identificationTypes: this.identificationTypeService.getAll(),
      genders: this.genderService.getAll(),
      positions: this.positionService.getAll(),
      workModes: this.workModeService.getAll(),
      nationalities: this.nationalityService.getAll(),
    }).subscribe({
      next: (resp) => {
        this.identificationTypes = resp.identificationTypes.data;
        this.genders = resp.genders.data;
        this.positions = resp.positions.data;
        this.workModes = resp.workModes.data;
        this.nationalities = resp.nationalities.data;
      },
      error: (err) => {
        console.error('Error loading form data', err);
      },
      complete: () => {
        this.loading = false;
        this.loadData();
      },
    });
  }

  loadData() {
    const employeeToEdit = this.formService.modalDataValue;
    console.log(employeeToEdit);
    if (employeeToEdit) {
      const selectedIdentificationType = this.identificationTypes.find(
        (type) => type.description === employeeToEdit.identificationType
      );

      const selectedPosition = this.positions.find(
        (pos) => pos.name === employeeToEdit.position
      );
      const contractDateMoment = employeeToEdit.contractDate
        ? moment(employeeToEdit.contractDate)
        : null;

      const contractEndDateMoment = employeeToEdit.contractEndDate
        ? moment(employeeToEdit.contractEndDate)
        : null;

      this.entityForm.patchValue({
        idIdentificationType: selectedIdentificationType?.id ?? null,
        idGender: employeeToEdit.idGender,
        idPosition: selectedPosition?.id ?? null,
        idWorkMode: employeeToEdit.idWorkMode,
        idNationality: employeeToEdit.idNationality,
        firstName: employeeToEdit.firstName,
        lastName: employeeToEdit.lastName,
        identification: employeeToEdit.identification,
        phone: employeeToEdit.phone,
        email: employeeToEdit.email,
        address: employeeToEdit.address,
        contractDate: contractDateMoment,
        contractEndDate: contractEndDateMoment,
      });

      this.entityId = employeeToEdit.id;
    }
  }

  initForm() {
    this.entityForm = this.fb.group({
      idIdentificationType: [null, Validators.required],
      idGender: [null, Validators.required],
      idPosition: [null, Validators.required],
      idWorkMode: [null, Validators.required],
      idNationality: [null, Validators.required],
      firstName: ['', [Validators.required, Validators.maxLength(80)]],
      lastName: ['', [Validators.required, Validators.maxLength(80)]],
      identification: ['', [Validators.required, Validators.maxLength(13)]],
      phone: ['', [Validators.pattern(/^\+?[0-9\s\-]{7,10}$/)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      address: ['', Validators.maxLength(255)],
      contractDate: [null, Validators.required],
      contractEndDate: [null],
    });
  }

  onSubmit() {
    console.log('Hola');
    const form = this.entityForm.value;

    if (this.entityForm.invalid) {
      this.entityForm.markAsTouched();
      return;
    }
    this.isSubmitting = true;
    const request: EmployeeRequestDTO = {
      idIdentificationType: form.idIdentificationType,
      idGender: form.idGender,
      idPosition: form.idPosition,
      idWorkMode: form.idWorkMode,
      idNationality: form.idNationality,
      firstName: form.firstName,
      lastName: form.lastName,
      identification: form.identification,
      phone: form.phone,
      email: form.email,
      address: form.address,
      contractDate: form.contractDate.format('YYYY-MM-DD'),
      contractEndDate: form.contractEndDate?.format('YYYY-MM-DD'),
    };
    if (this.entityId == 0) {
      this.employeeService.save(request).subscribe({
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
    } else {
      this.employeeService.update(request, this.entityId).subscribe({
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
    console.log(request);
  }

  onCancel() {
    this.formService.close();
  }
}
