import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ClerkService } from '@jsrob/ngx-clerk';

export const authGuard: CanActivateFn = async () => {
  const clerk = inject(ClerkService);
  const router = inject(Router);

  const loaded = await clerk.loaded?.();
  const user = clerk.user();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
