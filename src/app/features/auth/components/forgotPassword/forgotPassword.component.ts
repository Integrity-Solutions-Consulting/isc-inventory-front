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
<<<<<<< HEAD
=======
import { LoadingService } from '../../../../core/services/modals/loading/loading.service';
import { ModalDialogService } from '../../../../core/services/modals/modalDialog/modalDialog.service';
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
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
<<<<<<< HEAD
=======
  hidePassword = true;
  hideConfirmPassword = true;
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
<<<<<<< HEAD
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
=======
    private loading: LoadingService,
    private modalDialogService: ModalDialogService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  onSubmit(): void {
    this.loading.show();
    if (this.token) {
      console.log(this.resetForm.value.newPassword)
      console.log(this.resetForm.value.confirmPassword)
      if (
        this.resetForm.value.newPassword !== this.resetForm.value.confirmPassword
      ) {
        this.loading.hide();
        this.modalDialogService.open(
          'error',
          'Error',
          'Las contraseñas no coinciden'
        );
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
        return;
      }
      const passwordRequest: PasswordChangeRequestDTO = this.resetForm.value;
      this.authService.restorePassword(this.token, passwordRequest).subscribe({
        next: (resp) => {},
        error: (error) => {
<<<<<<< HEAD
          loadingRef.close();
          this.onError('Error', error.error.message);
        },
        complete: () => {
          loadingRef.close();
          this.onSuccess(
=======
          this.loading.hide();
          this.modalDialogService.open(
            'error',
            'Error',
            'Las contraseñas no coinciden'
          );
        },
        complete: () => {
          this.loading.hide();
          this.modalDialogService.open(
            'success',
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
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
<<<<<<< HEAD
            loadingRef.close();
            this.onError('Error', error.error.message);
          },
          complete: () => {
            loadingRef.close();
            this.onSuccess(
=======
            this.loading.hide;
            this.modalDialogService.open('error', 'Error', error.error.message);
          },
          complete: () => {
            this.loading.hide;
            this.modalDialogService.open(
              'success',
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
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
<<<<<<< HEAD
    const loadingRef = this.dialog.open(LoadingComponent, {
      disableClose: true,
      panelClass: 'transparent-dialog',
    });
    if (this.token) {
      if (!this.isTokenFormatValid(this.token)) {
        console.log('sadasd');
        loadingRef.close();
=======
    this.loading.show();
    if (this.token) {
      if (!this.isTokenFormatValid(this.token)) {
        this.loading.hide();
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
        this.router.navigate(['/error/404']);
      }

      this.authService.validateTokenForgotPassword(this.token).subscribe({
        next: (resp) => {},
        error: (error) => {
<<<<<<< HEAD
          loadingRef.close();
          this.router.navigate(['/error/404']);
        },
        complete: () => {
          loadingRef.close();
=======
          this.loading.hide();
          this.router.navigate(['/error/404']);
        },
        complete: () => {
          this.loading.hide();
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
        },
      });

      this.resetForm = this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      });
    } else {
<<<<<<< HEAD
      loadingRef.close();
=======
      this.loading.hide();
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
      this.recoveryForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
    }
  }

<<<<<<< HEAD
  onError(_title: string, _message: string) {
    this.dialog.open(MessageDialogComponent, {
      data: {
        type: 'error',
        title: _title,
        message: _message,
      },
    });
  }

=======
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
  isTokenFormatValid(token: string): boolean {
    // Valida que tenga 3 partes separadas por puntos (estructura JWT)
    return /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(token);
  }
<<<<<<< HEAD

  onSuccess(_title: string, _message: string) {
    this.dialog.open(MessageDialogComponent, {
      data: {
        type: 'success',
        title: _title,
        message: _message,
      },
    });
  }
=======
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
}
