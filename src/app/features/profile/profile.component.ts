import { Component } from '@angular/core';
import { SessionService } from '../../core/services/session/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileMenuComponent {
  userData: any;

  ngOnInit() {
    // Aquí puedes cargar más datos del usuario si es necesario
  }
}
