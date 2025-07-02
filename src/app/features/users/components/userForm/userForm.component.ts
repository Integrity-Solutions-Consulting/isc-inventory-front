import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeCatalogResponseDTO } from '../../../../core/models/ResponseDTO/administration/EmployeeCatalogResponseDTO';

import { EmployeeService } from '../../../employees/services/employee.service';
import { forkJoin } from 'rxjs';
import { MenuService } from '../../../menu/services/menu.service';
import { PrivilegeService } from '../../../privilege/services/privilege.service';
import { RoleService } from '../../../roles/services/role.service';
import { AuthService } from '../../../auth/services/auth.service';
import { FormService } from '../../../../core/services/modals/form/form.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { UserService } from '../../services/user.service';
import { MenuResponseDTO } from '../../../../core/models/ResponseDTO/MenuResponseDTO';
import { PrivilegeResponseDTO } from '../../../../core/models/ResponseDTO/PrivilegeResponseDTO';
import { RolesResponseDTO } from '../../../../core/models/ResponseDTO/RolesResponseDTO';
import { UserRequestoDTO } from '../../../../core/models/RequestDTO/UserRequestDTO';
@Component({
  selector: 'app-userForm',
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
  templateUrl: './userForm.component.html',
  styleUrls: ['./userForm.component.scss'],
})
export class UserFormComponent implements OnInit {
  employees: EmployeeCatalogResponseDTO[] = [];
  menus: MenuResponseDTO[] = [];
  privileges: PrivilegeResponseDTO[] = [];
  roles: RolesResponseDTO[] = [];
  selectedEmployee: EmployeeCatalogResponseDTO | null = null;

  loading: boolean = true;
  isSubmitting = false;

  userForm!: FormGroup;
  userId: number = 0;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private employeeService: EmployeeService,
    private menuService: MenuService,
    private privilegeService: PrivilegeService,
    private roleService: RoleService,
    private formService: FormService
  ) {}

  ngOnInit() {
    this.initForm();
    forkJoin({
      employees: this.employeeService.getAll(),
      menus: this.menuService.getAll(),
      privileges: this.privilegeService.getAll(),
      roles: this.roleService.getAll(),
    }).subscribe({
      next: (resp) => {
        this.employees = resp.employees.data;
        this.menus = resp.menus.data;
        this.privileges = resp.privileges.data;
        this.roles = resp.roles.data;
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

  initForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      employeeId: [null, Validators.required],
      roleIds: [[], Validators.required],
      privilegeIds: [[]], // Opcional y múltiple
      menuIds: [[]], // Opcional y múltiple
    });
  }

  loadData() {
    const userToEdit = this.formService.modalDataValue;
    if (userToEdit) {
      this.userForm.patchValue({
        name: userToEdit.username,
        email: userToEdit.email,
        employeeId: userToEdit.employeeId,
        roleIds: userToEdit.roles.map((r: RolesResponseDTO) => r.id),
        privilegeIds:
          userToEdit.privileges?.map((p: PrivilegeResponseDTO) => p.id) || [],
        menuIds: userToEdit.menus?.map((m: MenuResponseDTO) => m.id) || [],
      });
     this.selectedEmployee = this.employees.find((emp) => emp.id === userToEdit.employeeId) || null;
      this.userId = userToEdit.id;
    }
  }

  onEmployeeSelected(employeeId: number): void {
    const selected =
      this.employees.find((emp) => emp.id === employeeId) || null;
    this.selectedEmployee = selected;

    if (selected?.email) {
      this.userForm.patchValue({ email: selected.email });
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const userRequest: UserRequestoDTO = {
      username: this.userForm.value.name,
      email: this.userForm.value.email,
      firstNames: this.selectedEmployee?.fullName || '',
      employeeId: this.userForm.value.employeeId,
      rolesId: this.userForm.value.roleIds || [],
      privilegesId: this.userForm.value.privilegeIds || [],
      menusId: this.userForm.value.menuIds || [],
    };
    if (this.userId != 0) {
      this.userService.update(userRequest, this.userId).subscribe({
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
      this.authService.register(userRequest).subscribe({
        next: (resp) => {
          console.log(resp);
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

  onSave() {
    throw new Error('Method not implemented.');
  }

  onCancel() {
    this.formService.close();
  }
}
