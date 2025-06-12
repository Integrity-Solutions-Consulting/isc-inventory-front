import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { UserResponseDTO } from '../../../../core/models/ResponseDTO/UserResponseDTO';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    LayoutModule,
    MatCardModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  searchTerm: string = '';
  displayedColumns: string[] = [
    'firstNames',
    'email',
    'active',
    'suspended',
    'roles',
    'actions',
  ];
  dataSource = new MatTableDataSource<UserResponseDTO>();
  totalUsers = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isSmallScreen: boolean = false;

  constructor(private userService: UserService,private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.loadUsers();
    this.breakpointObserver.observe([Breakpoints.Handset, '(max-width: 920px)']).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  loadUsers(): void {
    // Simulación: reemplazar con llamada real al backend
    this.userService.getAll().subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.totalUsers = this.dataSource.data.length;
        console.log(this.dataSource.data);
      },
      error: (err) => {
        console.error('Error loading users', err);
      },
    });
    this.dataSource.paginator = this.paginator;
  }

  getRoleNames(user: any): string {
    return user.roles?.map((role: any) => role.name).join(', ') || '';
  }

  searchUsers(): void {
    // Implementa lógica real para buscar desde backend si es necesario
    console.log('Buscando:', this.searchTerm);
  }

  createUser(): void {
    console.log('Crear nuevo usuario');
  }

  viewUser(user: any): void {
    console.log('Ver usuario:', user);
  }

  editUser(user: any): void {
    console.log('Editar usuario:', user);
  }

  deleteUser(user: any): void {
    console.log('Eliminar usuario:', user);
  }

  onPageChange(event: PageEvent): void {
    console.log('Página cambiada:', event);
    // Implementar lógica si los datos vienen paginados desde el servidor
  }
}
