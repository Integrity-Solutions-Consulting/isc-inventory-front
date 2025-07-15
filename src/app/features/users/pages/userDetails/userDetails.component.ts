import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserResponseDTO } from '../../../../core/models/ResponseDTO/UserResponseDTO';
import { UserService } from '../../services/user.service';
import { Location, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { EquipmentDetailResponseDTO } from '../../../../core/models/ResponseDTO/inventory/EquipmentDetailResponseDTO';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormService } from '../../../../core/services/modals/form/form.service';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDialogService } from '../../../../core/services/modals/modalDialog/modalDialog.service';
import { RoleDetailResponseDTO } from '../../../../core/models/ResponseDTO/RoleDetailsResponseDTO';
import { PrivilegeResponseDTO } from '../../../../core/models/ResponseDTO/PrivilegeResponseDTO';
import { RolesResponseDTO } from '../../../../core/models/ResponseDTO/RolesResponseDTO';
import { MenuResponseDTO } from '../../../../core/models/ResponseDTO/MenuResponseDTO';

@Component({
  selector: 'app-userDetails',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './userDetails.component.html',
  styleUrls: ['./userDetails.component.css'],
})
export class UserDetailComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  user?: UserResponseDTO;
  privilege?: PrivilegeResponseDTO;
  roles?: RolesResponseDTO;
  menu?: MenuResponseDTO;
  roleDetails?: RoleDetailResponseDTO;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private modalDialogService: ModalDialogService,
    private formService: FormService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    // Obtener ID desde query params en lugar de route params
    this.route.queryParams.subscribe(params => {
      const id = Number(params['id']);
      console.log('ID obtenido de query params:', id);

      if (id && !isNaN(id)) {
        this.userService.getDetailsById(id).subscribe({
          next: (resp) => {
            this.user = resp.data;
            console.log('Usuario obtenido:', this.user);
            this.loading = false;
          },
          error: (err) => {
            console.error('Error al obtener usuario', err);
            this.loading = false;
          },
        });
      } else {
        console.error('ID no válido en query params');
        this.loading = false;
      }
    });
  }
  onClose():void{
    this.close.emit();
  }

  goBack(): void {
    this.location.back();
  }
}
