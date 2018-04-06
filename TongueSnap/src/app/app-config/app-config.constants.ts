import { InjectionToken } from '@angular/core';
import { IAppConfig } from './app-config.interface';

export const APP_DI_CONFIG: IAppConfig = {

  TYPE_CLIENT: "client",
  TYPE_PRACTITIONER: "practitioner",
  KEY_SNAP: "snap"

};

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

