import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthStore } from './shared-auth-data-access/shared-auth-data-access';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next) => {
  const authStore = inject(AuthStore);
  const token = authStore.token();

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  return next(req);
};
