import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { SessionService } from '../../../core/services/session/session.service';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    CommonModule,
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();

  userName = 'Adrián'; // o recuperarlo de tu servicio auth
  userPhotoUrl = ''; // url de la foto de perfil, o cadena vacía si no hay
  notificationsCount = 3; // Ejemplo, actualízalo dinámicamente
  notifications = [
    { message: 'Nuevo mensaje recibido' },
    { message: 'Actualización disponible' },
    { message: 'Tu pedido ha sido enviado' },
  ];

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private route:Router
  ) {}

  ngOnInit() {
    this.userName = this.sessionService.getUserNames();
  }

    logout() {
    this.authService.logout().subscribe({
      next: (resp)=>{},
      error: (error)=>{console.error(error)},
      complete: ()=>{
        this.sessionService.endSession();
        this.route.navigate(['']);
      }
    });
  }
}
