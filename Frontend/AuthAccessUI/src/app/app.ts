import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBaby, faBars, faEye, faEyeSlash, faKey, faRightFromBracket, faRightToBracket, faUserPlus, faUserShield } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AuthAccessUI');
  constructor(library: FaIconLibrary) {
    // Add icons to the library here
    library.addIcons(faKey, faRightFromBracket, faEye, faEyeSlash, faUserPlus, faUserShield, faBars, faRightToBracket);
  }
}
