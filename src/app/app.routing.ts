import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '/login' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
