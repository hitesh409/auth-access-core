import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from "./features/auth/login/login";
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faKey, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AuthAccessUI');
  constructor(library: FaIconLibrary) {
    // Add icons to the library here
    library.addIcons(faKey, faRightFromBracket, faEye, faEyeSlash);
  }
}
