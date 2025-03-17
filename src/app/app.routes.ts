import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'ar',
        loadComponent: () => import('./pages/ar/ar.component').then(m => m.ArComponent)
    }  ,
    {
        path: '**',
        redirectTo: 'ar'
    }  
];
