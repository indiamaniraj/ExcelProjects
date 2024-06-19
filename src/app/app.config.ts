import { ApplicationConfig } from '@angular/core';
import {  provideRouter } from '@angular/router';

import { routes,routerOptions} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations'


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideAnimations()]
};
