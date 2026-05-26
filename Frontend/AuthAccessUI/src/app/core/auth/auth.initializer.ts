import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

export async function authInitializer() {
  const authService = inject(AuthService);
  try {
    // firstValueFrom converts the Observable returned by refreshToken into a Promise, allowing us to use async/await syntax for better readability and error handling.
    await firstValueFrom(authService.refreshToken());
  } catch (err) {
    authService.clearCurrentUser();
  }
}
