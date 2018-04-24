import { InjectionToken } from '@angular/core';
import { IAppConfig } from './app-config.interface';

export const APP_DI_CONFIG: IAppConfig = {

  TYPE_CLIENT: "client",
  TYPE_PRACTITIONER: "practitioner",
  KEY_SNAP: "snap",
  LOGO_URL:"./assets/img/logo.png",
  LOGO2_URL:"./assets/img/logo2.png"
};

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

