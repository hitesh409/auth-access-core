import { bootstrapApplication } from '@angular/platform-browser';
import { App} from './app/app';
import { appConfig } from './app/app.config';
import { AppConfigService } from './app/core/services/app-config.service';

fetch('/config.json')
  .then(res => res.json())
  .then(config => {
    const appConfigService = new AppConfigService();
    appConfigService.setConfig(config);

    bootstrapApplication(App, {
      ...appConfig,
      providers: [
        ...appConfig.providers!,
        { provide: AppConfigService, useValue: appConfigService }
      ]
    });
  });