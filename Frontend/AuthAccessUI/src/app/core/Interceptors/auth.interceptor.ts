import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { TokenService } from '../services/token.service';

let isRefreshing = false;
let refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  let authReq = req;

  const token = tokenService.getToken();
  debugger;
  // Attach token
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {

        // If already refreshing, queue requests and wait for the new token
        if (isRefreshing) {
          return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(token => {
              return next(req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              }));
            })
          );
        }

        // Start refresh
        isRefreshing = true;
        refreshTokenSubject.next(null);

        return authService.refreshToken().pipe(
          switchMap((res: any) => {
            const newToken = res.accessToken;
            tokenService.setToken(newToken);
            isRefreshing = false;
            refreshTokenSubject.next(newToken);
            return next(req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            }));
          }),
          catchError(err => {
            isRefreshing = false;
            tokenService.clearToken();
            return throwError(() => err);
          })
        );
      }
      return throwError(() => error);
    })
  );
};