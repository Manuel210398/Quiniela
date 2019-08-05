import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import {FormsModule, NgControl} from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import {PipesModule} from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { EquiposComponent } from './equipos/equipos.component';
import { EstadiosComponent } from './estadios/estadios.component';
import { PartidosComponent } from './partidos/partidos.component';
import { PartidoComponent } from './partidos/partido.component';
import { QuinielaComponent } from './quiniela/quiniela.component';

import { JornadasComponent } from './jornadas/jornadas.component';
import { JornadaComponent } from './jornadas/jornada.component';
import { TorneosComponent } from './torneos/torneos.component';
@NgModule({
    declarations: [
        DashboardComponent,
        PagesComponent,
        AccountSettingsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        EquiposComponent,
        EstadiosComponent,
        PartidosComponent,
        PartidoComponent,
        QuinielaComponent,
        JornadasComponent,
        JornadaComponent,
        TorneosComponent
    ],
    exports: [
        DashboardComponent,
        PagesComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule

    ]
})

export class PagesModule{ }