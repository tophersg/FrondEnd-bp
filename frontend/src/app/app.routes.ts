import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { F1Component } from './components/f1/f1.component';
import { F2Component } from './components/f2/f2.component';
import { F3Component } from './components/f3/f3.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'f1', component: F1Component },
    { path: 'f2', component: F2Component },
    { path: 'f3', component: F3Component }
];
