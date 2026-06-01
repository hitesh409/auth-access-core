import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  imports: [],
  standalone: true,
  templateUrl: './loading-overlay.html',
  styleUrl: './loading-overlay.scss',
})
export class LoadingOverlay {
  loading = input<boolean>(false);
  message = input<string>('Loading...');
}
