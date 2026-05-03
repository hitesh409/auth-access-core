/*
Key Mechanism: Token Refresh with Request Queuing:
    1. First 401:
        triggers refresh
        locks system (isRefreshing = true)
    2. Other requests:
        wait on BehaviorSubject
    3. When refresh completes:
        all queued requests retry with new token 
*/

import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { TokenService } from "../auth/token.service";

let isRefreshing = false;
let refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(TokenService);
    const authService = inject(AuthService);
    
    const token = tokenService.getToken();
    let authReq = req;

    // Attach token to request if available
    if (token) {
        authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(authReq).pipe(
        catchError((error) => {
            if (error.status === 401) {
                // If already refreshing, queue the request
                if(isRefreshing){
                    return refreshTokenSubject.pipe(
                        filter(token => token !== null),
                        take(1),
                        switchMap(token => {
                            return next(req.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${token}`
                                }
                            }))
                        })
                    )
                }

                // Start token refresh process
                isRefreshing = true;
                refreshTokenSubject.next(null);

                return authService.refreshToken().pipe(
                    switchMap((res: any)=>{
                        const newToken = res.accessToken;
                        tokenService.setToken(newToken);
                        isRefreshing = false;
                        refreshTokenSubject.next(newToken);
                        return next(req.clone({
                            setHeaders:{
                                Authorization: `Bearer ${newToken}`
                            }
                        }))
                    }),
                    catchError(err=>{
                        isRefreshing = false;
                        tokenService.clearToken();
                        return throwError(() => err);
                    })
                )
            }
            return throwError(() => error);
        })
    )
}