import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr'; 
import { importProvidersFrom } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faKey, faRightFromBracket, faEye, faEyeSlash, faUserPlus, faUserShield } from '@fortawesome/free-solid-svg-icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    importProvidersFrom(FontAwesomeModule),{
      provide: 'FA_ICONS_INIT',
      useFactory: (library:FaIconLibrary)=>{
        library.addIcons(faKey, faRightFromBracket, faEye, faEyeSlash, faUserPlus, faUserShield);
        return true;
      },
      deps: [FaIconLibrary]
    }
  ]
};

