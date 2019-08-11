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
import {ResultadosComponent} from './resultados/resultados.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { QuinielasComponent } from './quinielas/quinielas.component';
import { QuinielaUnitariaComponent } from './quinielas/quiniela-unitaria.component';
import {JornadaService} from '../services/jornadas/jornada.service';
import {TorneosService} from '../services/torneos/torneos.service';
import {MomentModule} from 'ngx-moment';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

import { QuinierlaCardComponent } from './quinierla-card/quinierla-card.component';

@NgModule({
    declarations: [
        DashboardComponent,
       // PagesComponent,
        AccountSettingsComponent,
        ProfileComponent,
        UsuariosComponent,
        //ModalUploadComponent,
        EquiposComponent,
        EstadiosComponent,
        PartidosComponent,
        PartidoComponent,
        ResultadosComponent,
        QuinielaComponent,
        JornadasComponent,
        JornadaComponent,
        TorneosComponent,
        BusquedaComponent,
        QuinielasComponent,
        QuinielaUnitariaComponent,
        QuinierlaCardComponent,

    ],
    exports: [
        DashboardComponent,
        //PagesComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
        MomentModule,
      SwiperModule

    ],
    providers: [
      TorneosService,
      JornadaService,
      {
        provide: SWIPER_CONFIG,
        useValue: DEFAULT_SWIPER_CONFIG

      }

    ]
})

export class PagesModule { }
