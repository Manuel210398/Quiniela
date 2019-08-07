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
import { TorneosComponent } from './torneos/torneos.component';
import {ResultadosComponent} from './resultados/resultados.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { QuinielasComponent } from './quinielas/quinielas.component';
import { QuinielaUnitariaComponent } from './quinielas/quiniela-unitaria.component';

const pagesRoutes: Routes = [
    {
        path:'',component: PagesComponent,
        canActivate:[LoginGuardGuard],
        children:[
            {path: 'dashboard', component: DashboardComponent, data: {titulo:'Dashboard'}},
            {path: 'account-settings', component: AccountSettingsComponent , data: {titulo:'Ajustes del Tema'}},
            {path: 'profile', component: ProfileComponent , data: {titulo:'Perfil de Usuario'}},    
            {path: 'busqueda/:termino', component: BusquedaComponent , data: {titulo:'Buscador'}},                  
            
            
            {path: 'usuarios', component: UsuariosComponent , data: {titulo:'Mantenimiento de Usuarios'}},
            {path: 'equipos', component: EquiposComponent , data: {titulo:'Mantenimiento de Equipos'}},
            {path: 'estadios', component: EstadiosComponent , data: {titulo:'Mantenimiento de Estadios'}},
            {path: 'resultados', component: ResultadosComponent , data: {titulo:'Mantenimiento Quiniela'}},
            {path: 'quiniela', component: QuinielaComponent , data: {titulo:'Mantenimiento Quiniela'}},


            {path: 'partidos', component: PartidosComponent , data: {titulo:'Mantenimiento de Partidos'}},
            {path: 'partidos/:idJornada', component: PartidosComponent , data: {titulo:'Mantenimiento de Partidos'}},
            {path: 'partido/:id', component: PartidoComponent , data: {titulo:'Mantenimiento Partido'}},
            {path: 'partido/:id/:idJornada', component: PartidoComponent , data: {titulo:'Mantenimiento Partido'}},
           

            {path: 'jornadas', component: JornadasComponent , data: {titulo:'Mantenimiento Jornadas'}},
            {path: 'jornadas/:idTorneo', component: JornadasComponent , data: {titulo:'Mantenimiento Jornadas'}},
            {path: 'jornada/:id', component: JornadaComponent , data: {titulo:'Mantenimiento Jornada'}},
            {path: 'jornada/:id/:idTorneo', component: JornadaComponent , data: {titulo:'Mantenimiento Jornada'}},

            {path: 'quinielas', component: QuinielasComponent , data: {titulo:'Mantenimiento Quinielas'}},
            {path: 'quinielas/:idTorneo', component: QuinielasComponent , data: {titulo:'Mantenimiento Jornadas'}},
            {path: 'quinielaUnitaria/:id', component: QuinielaUnitariaComponent , data: {titulo:'Mantenimiento Jornada'}},
            {path: 'quinielaUnitaria/:id/:idTorneo', component: QuinielaUnitariaComponent , data: {titulo:'Mantenimiento Jornada'}},



          {path: 'torneos', component: TorneosComponent , data: {titulo:'Mantenimiento Torneo'}},
            {path: '', redirectTo : '/dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
