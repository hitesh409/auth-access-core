import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized-page',
  imports: [],
  templateUrl: './unauthorized-page.html',
  styleUrl: './unauthorized-page.scss',
})
export class UnauthorizedPage {
  constructor(private router: Router){}
  goHome() {
    this.router.navigate(['/dashboard']);
  }
}
