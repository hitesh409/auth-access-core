import { Location } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { BreadcrumbItem } from '../../models/breadcrumb.model';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-page-header',
  imports: [FontAwesomeModule, ButtonComponent],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly faChevronLeft = faChevronLeft;
  protected readonly faChevronRight = faChevronRight;

  readonly scrolled = signal(false);

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const pageContainer = this.elementRef.nativeElement.closest('.page-container') as HTMLElement | null;
    const scrollContainer = pageContainer ?? window;
    const updateScrolled = () => {
      const scrollTop = pageContainer ? pageContainer.scrollTop : window.scrollY;

      this.scrolled.set(scrollTop > 12);
    };

    updateScrolled();
    scrollContainer.addEventListener('scroll', updateScrolled, { passive: true });
    this.destroyRef.onDestroy(() => scrollContainer.removeEventListener('scroll', updateScrolled));
  }

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
