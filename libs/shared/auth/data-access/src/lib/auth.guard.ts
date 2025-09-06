import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStore } from './shared-auth-data-access/shared-auth-data-access';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authStore = inject(AuthStore);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.authStore.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private authStore = inject(AuthStore);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.authStore.isAuthenticated() && this.authStore.hasRole('admin')) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
