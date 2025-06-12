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
    private session: SessionService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginRequestDTO = this.loginForm.value;
      const loadingRef = this.dialog.open(LoadingComponent, {
        disableClose: true,
        panelClass: 'transparent-dialog',
      });
      this.authService.login(loginData).subscribe({
        next: (resp) => {
          this.session.startSession(resp.data);
          console.log(resp);
        },
        error: (error) => {
          loadingRef.close();
          console.log(error)
          this.onError("Error",error.error.message)
        },
        complete: () => {
          loadingRef.close();
          this.router.navigate(['/dashboard']);
        },
      });
    }
  }

  ngOnInit() {}

  onForgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }

  onError(_title:string, _message:string) {
    this.dialog.open(MessageDialogComponent, {
      data: {
        type: 'error',
        title: _title,
        message: _message,
      },
    });
  }
}
