import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { MessageDialogComponent } from '../../../../shared/components/message-dialog/message-dialog.component';
import { AuthService } from '../../services/auth.service';
import { PasswordChangeRequestDTO } from '../../../../api';
import { error_routes } from '../../../../errors/routes/error.routing';
@Component({
  selector: 'app-forgotPassword',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  recoveryForm!: FormGroup;
  resetForm!: FormGroup;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {

  }

  onSubmit(): void {
    const loadingRef = this.dialog.open(LoadingComponent, {
      disableClose: true,
      panelClass: 'transparent-dialog',
    });

    if (this.token) {
      if (
        this.resetForm.value.password !== this.resetForm.value.confirmPassword
      ) {
        this.onError('Error', 'Las contraseñas no coinciden');
        loadingRef.close();
        return;
      }
      const passwordRequest: PasswordChangeRequestDTO = this.resetForm.value;
      this.authService.restorePassword(this.token, passwordRequest).subscribe({
        next: (resp) => {},
        error: (error) => {
          loadingRef.close();
          this.onError('Error', error.error.message);
        },
        complete: () => {
          loadingRef.close();
          this.onSuccess(
            '¡Contraseña actualizada!',
            'Ahora puedes iniciar sesión con tu nueva contraseña.'
          );
        },
      });
    } else {
      if (this.recoveryForm.valid) {
        const email = this.recoveryForm.value.email;
        this.authService.generateTokenForgotPassword(email).subscribe({
          next: (resp) => {
            console.log(resp);
          },
          error: (error) => {
            loadingRef.close();
            this.onError('Error', error.error.message);
          },
          complete: () => {
            loadingRef.close();
            this.onSuccess(
              '¡Solicitud realizada correctamente!',
              'Revisa tu bandeja de entrada para redirigirte a la recuperación de contraseña.'
            );
          },
        });
      }
    }
  }

  goBackToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    const loadingRef = this.dialog.open(LoadingComponent, {
      disableClose: true,
      panelClass: 'transparent-dialog',
    });
    if (this.token) {
      if (!this.isTokenFormatValid(this.token)) {
        console.log('sadasd');
        loadingRef.close();
        this.router.navigate(['/error/404']);
      }

      this.authService.validateTokenForgotPassword(this.token).subscribe({
        next: (resp) => {},
        error: (error) => {
          loadingRef.close();
          this.router.navigate(['/error/404']);
        },
        complete: () => {
          loadingRef.close();
        },
      });

      this.resetForm = this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      });
    } else {
      loadingRef.close();
      this.recoveryForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
    }
  }

  onError(_title: string, _message: string) {
    this.dialog.open(MessageDialogComponent, {
      data: {
        type: 'error',
        title: _title,
        message: _message,
      },
    });
  }

  isTokenFormatValid(token: string): boolean {
    // Valida que tenga 3 partes separadas por puntos (estructura JWT)
    return /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(token);
  }

  onSuccess(_title: string, _message: string) {
    this.dialog.open(MessageDialogComponent, {
      data: {
        type: 'success',
        title: _title,
        message: _message,
      },
    });
  }
}
