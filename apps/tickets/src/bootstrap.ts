import {provideHttpClient} from '@angular/common/http';
import {importProvidersFrom, isDevMode} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {PreloadAllModules, provideRouter, withPreloading,} from '@angular/router';
import {AppComponent} from './app/app.component';
import {APP_ROUTES} from './app/app.routes';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {provideEffects} from "@ngrx/effects";
import {provideStore} from "@ngrx/store";
import {MatDialogModule} from "@angular/material/dialog";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from "@angular/material/snack-bar";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    importProvidersFrom(MatDialogModule),
    provideStore(),
    provideEffects(),
    isDevMode() ? provideStoreDevtools() : [],
    importProvidersFrom(MatSnackBarModule),
    provideAnimations(),
  ],
});
