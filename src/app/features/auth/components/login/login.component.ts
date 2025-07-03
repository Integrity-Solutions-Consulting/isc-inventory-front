import { LoadingService } from './../../../../core/services/modals/loading/loading.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../../../shared/components/message-dialog/message-dialog.component';
import { LoginRequestDTO } from '../../../../api';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { AuthService } from '../../services/auth.service';
import { ErrorResponseDTO } from '../../../../core/models/ResponseDTO/ErrorResponseDTO';
import { SessionService } from '../../../../core/services/session/session.service';
<<<<<<< HEAD
=======
import { ModalDialogService } from '../../../../core/services/modals/modalDialog/modalDialog.service';
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private session: SessionService,
<<<<<<< HEAD
    private loading: LoadingService
=======
    private loading: LoadingService,
    private modalDialogService: ModalDialogService
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginRequestDTO = this.loginForm.value;
      this.loading.show();
      this.authService.login(loginData).subscribe({
        next: (resp) => {
          this.session.startSession(resp.data);
          console.log(resp);
        },
        error: (error) => {
          this.loading.hide();
<<<<<<< HEAD
          console.log(error);
          this.onError('Error', error.error.message);
=======
          this.modalDialogService.open('error', 'Error', error.error.message);
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
        },
        complete: () => {
          this.loading.hide();
          this.router.navigate(['/dashboard']);
        },
      });
    }
  }

  ngOnInit() {}

  onForgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
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
}
