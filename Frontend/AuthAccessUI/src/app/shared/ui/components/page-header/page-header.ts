import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { BreadcrumbItem } from '../../models/breadcrumb.model';
import { ButtonComponent } from "../button/button";

@Component({
  selector: 'app-page-header',
  imports: [FontAwesomeModule, ButtonComponent],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  protected readonly faChevronLeft = faChevronLeft;
  protected readonly faChevronRight = faChevronRight;

  title = input.required<string>();

  breadcrumbs = input<BreadcrumbItem[]>([]);

  goBack(): void {
    this.location.back();
  }

  goForward(): void {
    window.history.forward();
  }

  navigate(route?: string): void {
    if (!route) {
      return;
    }

    this.router.navigateByUrl(route);
  }
}
