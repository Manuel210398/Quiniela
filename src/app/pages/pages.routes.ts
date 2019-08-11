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
import { AdminGuard } from '../services/guards/admin.guard';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

const pagesRoutes: Routes = [
    {
        path: 'dashboard', 
        component: DashboardComponent, 
        canActivate:[VerificaTokenGuard],
        data: {titulo:'Dashboard'}
    },
    {
        path: 'account-settings', 
        component: AccountSettingsComponent , 
        canActivate:[VerificaTokenGuard],
        data: {titulo:'Ajustes del Tema'}
    },
    {
        path: 'profile', 
        component: ProfileComponent , 
        canActivate:[VerificaTokenGuard],
        data: {titulo:'Perfil de Usuario'}
    },    
    {
        path: 'busqueda/:termino', 
        component: BusquedaComponent , 
        canActivate:[VerificaTokenGuard],
        data: {titulo:'Buscador'}
    },                  
    {
        path: 'usuarios', 
        component: UsuariosComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento de Usuarios'}
    },
    {
        path: 'equipos', 
        component: EquiposComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento de Equipos'}
    },

    {
        path: 'estadios', 
        component: EstadiosComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento de Estadios'}
    },
    {
        path: 'resultados', 
        component: ResultadosComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento Quiniela'}
    },
    {
        path: 'quiniela', 
        component: QuinielaComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento Quiniela'}
    },


    {
        path: 'partidos', 
        component: PartidosComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento de Partidos'}
    },
    {
        path: 'partidos/:idJornada', 
        component: PartidosComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento de Partidos'}
    },
    {
        path: 'partido/:id', 
        component: PartidoComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento Partido'}
    },
    {
        path: 'partido/:id/:idJornada', 
        component: PartidoComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento Partido'}
    },
    

    {
        path: 'jornadas', 
        component: JornadasComponent ,
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento Jornadas'}
    },
    {
        path: 'jornadas', 
        component: JornadasComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento Jornadas'}
    },
    {
        path: 'jornada/:id', 
        component: JornadaComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento Jornada'}
    },
    {
        path: 'jornada/:id/:idTorneo', 
        component: JornadaComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento Jornada'}
    },

    {
        path: 'quinielas', 
        component: QuinielasComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento Quinielas'}
    },
    {
        path: 'quinielas/:idTorneo', 
        component: QuinielasComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento Jornadas'}
    },
    {
        path: 'quinielaUnitaria/:id', 
        component: QuinielaUnitariaComponent ,
        canActivate:[AdminGuard,VerificaTokenGuard],
            data: {titulo:'Mantenimiento Jornada'}
    },
    {
        path: 'quinielaUnitaria/:id/:idTorneo', 
        component: QuinielaUnitariaComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento Jornada'}
    },
    {
        path: 'torneos', 
        component: TorneosComponent , 
        canActivate:[AdminGuard,VerificaTokenGuard],
        data: {titulo:'Mantenimiento Torneo'}
    },

    {path: '', redirectTo : '/dashboard', pathMatch: 'full'}
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
