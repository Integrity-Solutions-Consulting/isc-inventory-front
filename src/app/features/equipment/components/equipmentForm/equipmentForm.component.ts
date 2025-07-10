import { Component, OnInit } from '@angular/core';
import {
  FormArray,
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
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormService } from '../../../../core/services/modals/form/form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ComponentTypeResponseDTO } from '../../../../core/models/ResponseDTO/inventory/ComponentTypeResponseDTO';
import { CompanyResponseDTO } from '../../../../core/models/ResponseDTO/inventory/CompanyResponseDTO';
import { ConditionResponseDTO } from '../../../../core/models/ResponseDTO/inventory/ConditionResponseDTO';
import { ConditionsService } from '../../../../core/services/conditions/conditions.service';
import { CompanieService } from '../../../companies/services/companie.service';
import { EquipmentComponentService } from '../../services/equipmentComponent/equipmentComponent.service';
import { EquipmentCharacteristicResponseDTO } from '../../../../core/models/ResponseDTO/inventory/EquipmentCharacteristicResponseDTO';
import { EquipmentCategoriesService } from '../../services/equipmentCategories/equipmentCategories.service';
import { EquipmentCategoryResponseDTO } from '../../../../core/models/ResponseDTO/inventory/EquipmentCategoryResponseDTO';
import { EquipmentRequestDTO } from '../../../../core/models/RequestDTO/inventory/EquipmentRequestDTO';
import { EquipmentService } from '../../services/equipment/equipment.service';

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
    MatSlideToggleModule,
    NgxMatSelectSearchModule,
  ],
  templateUrl: './equipmentForm.component.html',
  styleUrls: ['./equipmentForm.component.css'],
})


export class EquipmentFormComponent implements OnInit {
  categories: EquipmentCategoryResponseDTO[] = [];
  categoryFilterCtrl = new FormControl();
  filteredCategories: EquipmentCategoryResponseDTO[] = [];

  companies: CompanyResponseDTO[] = [];
  companyFilterCtrl = new FormControl();
  filteredCompanies: CompanyResponseDTO[] = [];

  components: ComponentTypeResponseDTO[] = [];
  componentFilterCtrl = new FormControl();
  filteredComponents: ComponentTypeResponseDTO[] = [];

  conditions: ConditionResponseDTO[] = [];
  conditionFilterCtrl = new FormControl();
  filteredConditions: ConditionResponseDTO[] = [];

  isSubmitting = false;
  loading = true;

  equipmentForm!: FormGroup;
  entityId: number = 0;

  private _onDestroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private conditionService: ConditionsService,
    private companieService: CompanieService,
    private equipmentComponentService: EquipmentComponentService,
    private equipmentCategoryService: EquipmentCategoriesService,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit() {
    this.initForm();
    forkJoin({
      categories: this.equipmentCategoryService.getAll(),
      conditions: this.conditionService.getAll(),
      components: this.equipmentComponentService.getAll(),
      companies: this.companieService.getAll(),
    }).subscribe({
      next: (resp) => {
        this.categories = resp.categories.data;
        this.filteredCategories = [...this.categories];
        this.categoryFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => this.filterCategories());

        this.conditions = resp.conditions.data;
        this.filteredConditions = [...this.conditions];
        this.conditionFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => this.filterConditions());

        this.components = resp.components.data;
        this.filteredComponents = [...this.components];
        this.componentFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => this.filterComponents());

        this.companies = resp.companies.data;
        this.filteredCompanies = [...this.companies];
        this.companyFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => this.filterCompanies());

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

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  filterConditions() {
  const search = this.conditionFilterCtrl.value?.toLowerCase() || '';
  this.filteredConditions = this.conditions.filter(c =>
    c.name.toLowerCase().includes(search)
  );
}

filterCompanies() {
  const search = this.companyFilterCtrl.value?.toLowerCase() || '';
  this.filteredCompanies = this.companies.filter(c =>
    c.name.toLowerCase().includes(search)
  );
}

filterCategories() {
  const search = this.categoryFilterCtrl.value?.toLowerCase() || '';
  this.filteredCategories = this.categories.filter(c =>
    c.name.toLowerCase().includes(search)
  );
}

filterComponents() {
  const search = this.componentFilterCtrl.value?.toLowerCase() || '';
  this.filteredComponents = this.components.filter(c =>
    c.description.toLowerCase().includes(search)
  );
}


  initForm() {
    this.equipmentForm = this.fb.group({
      condition: [null, Validators.required],
      company: [null, Validators.required],
      categoryId: [null],
      categoryName: [''],
      brand: [''],
      model: [''],
      serialNumber: [''],
      itemCode: [''],
      equipmentCharacteristics: this.fb.array([]),
      isCreatingNewCategory: [false],
    });
    this.equipmentForm
      .get('isCreatingNewCategory')
      ?.valueChanges.subscribe(() => {
        this.toggleCategoryValidators();
      });

    this.toggleCategoryValidators();
  }

loadData() {
  const entityToEdit = this.formService.modalDataValue;

  if (entityToEdit) {
    this.equipmentForm.patchValue({
      condition: entityToEdit.equipmentConditionId,
      company: entityToEdit.companyId,
      categoryId: entityToEdit.categoryId || null,
      categoryName: entityToEdit.categoryName || '',
      brand: entityToEdit.brand,
      model: entityToEdit.model,
      serialNumber: entityToEdit.serialNumber,
      itemCode: entityToEdit.itemCode,
      isCreatingNewCategory: !!entityToEdit.categoryName && !entityToEdit.categoryId,
    });

    // Limpiar características actuales
    this.characteristics.clear();

    // Agregar características desde los datos
    if (entityToEdit.characteristics?.length) {
      entityToEdit.characteristics.forEach((charac: EquipmentCharacteristicResponseDTO) => {
        this.characteristics.push(
          this.fb.group({
            id: [charac.id],
            component: [charac.componentId, Validators.required],
            description: [charac.description],
          })
        );
      });
    }

    // Si deseas deshabilitar campos cuando estás editando
    this.entityId = (entityToEdit as any).id; // Asegúrate de que venga el id si es necesario

    this.toggleCategoryValidators(); // ← importante para actualizar validaciones
  }
}


  toggleCategoryValidators() {
    this.equipmentForm
      .get('categoryName')
      ?.setValidators(this.isCreatingNewCategory ? [Validators.required] : []);
    this.equipmentForm.get('categoryName')?.updateValueAndValidity();

    this.equipmentForm
      .get('categoryId')
      ?.setValidators(!this.isCreatingNewCategory ? [Validators.required] : []);
    this.equipmentForm.get('categoryId')?.updateValueAndValidity();
  }

  get characteristics(): FormArray {
    return this.equipmentForm.get('equipmentCharacteristics') as FormArray;
  }

  get isCreatingNewCategory(): boolean {
    return this.equipmentForm.get('isCreatingNewCategory')?.value;
  }
  addCharacteristic() {
    const control = this.fb.group({
      id: [null],
      component: [null, Validators.required],
      description: ['', Validators.required],
    });
    this.characteristics.push(control);
    control.updateValueAndValidity(); // 👈 importante
  }

  removeCharacteristic(index: number) {
    this.characteristics.removeAt(index);
  }

  toUpperCaseField(fieldName: string) {
  const control = this.equipmentForm.get(fieldName);
  if (control) {
    const currentValue = control.value;
    if (currentValue) {
      control.setValue(
        currentValue.toString().toUpperCase(),
        { emitEvent: false } // Evita bucles de detección de cambios
      );
    }
  }
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
}
