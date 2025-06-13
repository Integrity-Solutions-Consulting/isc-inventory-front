import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
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
import { LoadingService } from '../../../../core/services/modals/loading/loading.service';
import { finalize } from 'rxjs';
import { getSpanishPaginatorIntl } from '../../../../core/functions/mat-paginator-intl-es';

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
    MatCardModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: getSpanishPaginatorIntl,
    },
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

  constructor(
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.breakpointObserver
      .observe([Breakpoints.Handset, '(max-width: 920px)'])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  loadUsers(): void {
    this.loading.show(); // Show loading spinner
    this.userService
      .getAll()
      .pipe(
        finalize(() => this.loading.hide()) // Siempre se ejecuta al final
      )
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
          this.totalUsers = this.dataSource.data.length;
          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource.data);
        },
        error: (err) => {
          console.error('Error loading users', err);
          this.loading.hide(); // Hide loading spinner on error
        },
        complete: () => {
          this.loading.hide(); // Hide loading spinner on complete
        },
      });
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
