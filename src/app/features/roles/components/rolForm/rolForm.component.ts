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
import { RoleService } from '../../services/role.service';
import { FormService } from '../../../../core/services/modals/form/form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { forkJoin } from 'rxjs';
import { FlattenedMenu } from '../../../../core/models/ResponseDTO/authentication/FlattenedMenu';

@Component({
  selector: 'app-rolForm',
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
  ],
  templateUrl: './rolForm.component.html',
  styleUrls: ['./rolForm.component.scss'],
})
export class RolFormComponent implements OnInit {
  applications: any[] = [];
  privileges: PrivilegeResponseDTO[] = [];
  menus: MenuResponseDTO[] = [];
  flattenedMenus: FlattenedMenu[] = [];

  loading: boolean = true;
  isSubmitting = false;

  roleForm!: FormGroup;
  entityId: number = 0;

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private privilegeService: PrivilegeService,
    private roleService: RoleService,
    private formService: FormService
  ) {}

  ngOnInit() {
    this.initForm();
    forkJoin({
      menus: this.menuService.getAll(),
      privileges: this.privilegeService.getAll(),
    }).subscribe({
      next: (resp) => {
        this.menus = resp.menus.data;
        this.flattenedMenus = this.flattenMenus(this.menus);
        this.privileges = resp.privileges.data;
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
      this.roleForm.patchValue({
        name: entityToEdit.name,
        description: entityToEdit.description,
        applicationId: entityToEdit.applicationId,
        privilegesId:
          entityToEdit.rolePrivileges?.map((p: PrivilegeResponseDTO) => p.id) ||
          [],
        menusId: entityToEdit.menus?.map((m: MenuResponseDTO) => m.id) || [],
      });
      this.entityId = entityToEdit.id;
      this.roleForm.get('name')?.disable();
      this.roleForm.get('description')?.disable();
      this.roleForm.get('applicationId')?.disable();
    }
  }

  initForm() {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      applicationId: [1, Validators.required],
      privilegesId: [[]],
      menusId: [[]],
    });
  }

  onSubmit() {
    if (this.roleForm.invalid) {
      this.roleForm.markAsTouched();
      return;
    }
    this.isSubmitting = true;
    const roleRequet: RoleRequestDTO = {
      name: this.roleForm.value.name,
      description: this.roleForm.value.description,
      applicationId: this.roleForm.value.applicationId,
      privilegesId: this.roleForm.value.privilegesId || [],
      menusId: this.roleForm.value.menusId || [],
    };
    if (this.entityId == 0) {
      this.roleService.save(roleRequet).subscribe({
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
      this.roleService.update(roleRequet,this.entityId).subscribe({
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

  flattenMenus(menus: MenuResponseDTO[], level = 0): FlattenedMenu[] {
    let result: FlattenedMenu[] = [];

    for (const menu of menus) {
      result.push({ id: menu.id!, label: menu.label!, level });

      if (menu.children?.length) {
        result = result.concat(this.flattenMenus(menu.children, level + 1));
      }
    }

    return result;
  }
}
