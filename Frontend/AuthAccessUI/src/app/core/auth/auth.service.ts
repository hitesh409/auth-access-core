import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { AppConfigService } from '../services/app-config.service';
import { CurrentUser } from './models/current-user.model';
import { AuthResponse } from './models/auth-response.model';
import { tap } from 'rxjs';
import { TokenService } from '../services/token.service';
import { PermissionService } from './permission.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private config: AppConfigService,
    private tokenService: TokenService,
    private permissionService: PermissionService,
  ) {}

  private readonly currentUserSignal = signal<CurrentUser | null>(null);
  readonly currentUser = computed(() => this.currentUserSignal());
  readonly isAuthenticated = computed(() => !!this.currentUserSignal());

  hydrateSession(response: AuthResponse): void {
    this.tokenService.setToken(response.accessToken);
    this.currentUserSignal.set(response.userContext);
    this.permissionService.setPermissions(response.userContext.permissions);
  }

  clearCurrentUser(): void {
    this.tokenService.clearToken();
    this.currentUserSignal.set(null);
    this.permissionService.clearPermissions();
  }

  register(data: any) {
    return this.http.post(`${this.config.apiUrl}/auth/register`, data);
  }

  login(data: any) {
    return this.http
      .post<AuthResponse>(`${this.config.apiUrl}/auth/login`, data, { withCredentials: true })
      .pipe(
        tap((res) => {
          this.hydrateSession(res);
        }),
      );
  }

  refreshToken() {
    return this.http
      .post<AuthResponse>(`${this.config.apiUrl}/auth/refresh`, {}, { withCredentials: true })
      .pipe(
        tap((res) => {
          this.hydrateSession(res);
        }),
      );
  }

  logout() {
    return this.http.post(`${this.config.apiUrl}/auth/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.clearCurrentUser();
      }),
    );
  }
}
