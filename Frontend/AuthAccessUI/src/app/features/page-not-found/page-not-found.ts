import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/components/button/button';

@Component({
  selector: 'app-page-not-found',
  imports: [ButtonComponent],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss',
})
export class PageNotFound {
  constructor(private router: Router) {}
  goHome() {
    this.router.navigate(['/dashboard']);
  }
}
