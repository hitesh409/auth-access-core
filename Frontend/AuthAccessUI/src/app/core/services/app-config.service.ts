import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private config: any;

  setConfig(config: any) {
    this.config = config;
  }

  get apiUrl(): string {
    return this.config?.apiUrl;
  }

  get appName(): string {
    return this.config?.appName;
  }
}