import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import {LoginGuardGuard} from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EquiposComponent } from './equipos/equipos.component';
import { EstadiosComponent } from './estadios/estadios.component';
import { PartidosComponent } from './partidos/partidos.component';
import { PartidoComponent } from './partidos/partido.component';
import { QuinielaComponent } from './quiniela/quiniela.component';
import { JornadasComponent } from './jornadas/jornadas.component';
import { JornadaComponent } from './jornadas/jornada.component';

const pagesRoutes: Routes = [
    {
        path:'',component: PagesComponent,
        canActivate:[LoginGuardGuard],
        children:[
            {path: 'dashboard', component: DashboardComponent, data: {titulo:'Dashboard'}},
            {path: 'account-settings', component: AccountSettingsComponent , data: {titulo:'Ajustes del Tema'}},
            {path: 'profile', component: ProfileComponent , data: {titulo:'Perfil de Usuario'}},           
            {path: 'usuarios', component: UsuariosComponent , data: {titulo:'Mantenimiento de Usuarios'}},
            {path: 'equipos', component: EquiposComponent , data: {titulo:'Mantenimineto de Equipos'}},
            {path: 'estadios', component: EstadiosComponent , data: {titulo:'Mantenimineto de Estadios'}},
            {path: 'partidos', component: PartidosComponent , data: {titulo:'Mantenimineto de Partidos'}},
            {path: 'partido/:id', component: PartidoComponent , data: {titulo:'Mantenimineto Partido'}},
            {path: 'quiniela', component: QuinielaComponent , data: {titulo:'Mantenimineto Quiniela'}},
            {path: 'jornadas', component: JornadasComponent , data: {titulo:'Mantenimineto Jornadas'}},
            {path: 'jornada/:id', component: JornadaComponent , data: {titulo:'Mantenimineto Jornada'}},
            {path: '', redirectTo : '/dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);