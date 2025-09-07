import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@shopmono/shared-data-access-auth';
import { ToastService } from '@shopmono/shared-ui';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput
                     type="email"
                     formControlName="email"
                     placeholder="Enter your email">
              <mat-icon matSuffix>email</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput
                     type="password"
                     formControlName="password"
                     placeholder="Enter your password">
              <mat-icon matSuffix>lock</mat-icon>
            </mat-form-field>

            <button mat-raised-button
                    color="primary"
                    type="submit"
                    class="full-width"
                    [disabled]="loginForm.invalid || loading()">
              <mat-icon *ngIf="!loading()">login</mat-icon>
              <mat-icon *ngIf="loading()">hourglass_empty</mat-icon>
              {{ loading() ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <div class="demo-credentials">
            <h4>Demo Credentials:</h4>
            <p><strong>Admin:</strong> admin@example.com / admin</p>
            <p><strong>Customer:</strong> customer@example.com / customer</p>
          </div>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 16px;
    }

    .login-card {
      width: 100%;
      max-width: 400px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .demo-credentials {
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 8px;
      margin-top: 16px;
    }

    .demo-credentials h4 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .demo-credentials p {
      margin: 4px 0;
      font-size: 14px;
      color: #666;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = signal(false);

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading.set(true);
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          this.toastService.success('Login successful!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.toastService.error('Login failed: ' + error.message);
          this.loading.set(false);
        }
      });
    }
  }
}
