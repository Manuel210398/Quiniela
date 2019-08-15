import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';



const appRoutes : Routes = [
   
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {
        path:'',
        component: PagesComponent,
        canActivate:[LoginGuardGuard],
        loadChildren: './pages/pages.module#PagesModule'
    },
    {path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes,{useHash: true});