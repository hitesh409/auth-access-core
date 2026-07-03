import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/ui/components/button/button';

@Component({
  selector: 'app-unauthorized-page',
  imports: [ButtonComponent],
  templateUrl: './unauthorized-page.html',
  styleUrl: './unauthorized-page.scss',
})
export class UnauthorizedPage {
  constructor(private router: Router){}
  goHome() {
    this.router.navigate(['/dashboard']);
  }
}
