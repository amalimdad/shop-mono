import { Injectable, signal, computed, inject } from '@angular/core';
import {  Observable, of, delay, tap } from 'rxjs';

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface AuthState {
  token?: string;
  user?: User;
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private readonly _authState = signal<AuthState>({
    isAuthenticated: false
  });

  readonly authState = this._authState.asReadonly();
  readonly isAuthenticated = computed(() => this._authState().isAuthenticated);
  readonly user = computed(() => this._authState().user);
  readonly token = computed(() => this._authState().token);

  setAuth(token: string, user: User): void {
    this._authState.set({
      token,
      user,
      isAuthenticated: true
    });
  }

  clearAuth(): void {
    this._authState.set({
      isAuthenticated: false
    });
  }

  hasRole(role: string): boolean {
    return this._authState().user?.role === role;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {
  private readonly users = [
    { id: '1', email: 'admin@example.com', password: 'admin', role: 'admin' as const },
    { id: '2', email: 'customer@example.com', password: 'customer', role: 'customer' as const }
  ];

  login(username: string, password: string): Observable<{ token: string; user: User }> {
    const user = this.users.find(u => u.email === username && u.password === password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = `fake-jwt-token-${user.id}`;

    return of({ token, user: userWithoutPassword }).pipe(
      delay(300)
    );
  }

  logout(): Observable<void> {
    return of(undefined).pipe(
      delay(300)
    );
  }

  getProfile(): Observable<User> {
    // In a real app, this would validate the token
    return of({
      id: '1',
      email: 'admin@example.com',
      role: 'admin' as const
    }).pipe(
      delay(300)
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStore = inject(AuthStore);
  private fakeApi = inject(FakeApiService);


  login(username: string, password: string): Observable<{ token: string; user: User }> {
    return this.fakeApi.login(username, password).pipe(
      tap(({ token, user }) => {
        this.authStore.setAuth(token, user);
        localStorage.setItem('auth_token', token);
      })
    );
  }

  logout(): Observable<void> {
    return this.fakeApi.logout().pipe(
      tap(() => {
        this.authStore.clearAuth();
        localStorage.removeItem('auth_token');
      })
    );
  }

  initializeAuth(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.fakeApi.getProfile().subscribe({
        next: (user) => {
          this.authStore.setAuth(token, user);
        },
        error: () => {
          localStorage.removeItem('auth_token');
        }
      });
    }
  }
}
