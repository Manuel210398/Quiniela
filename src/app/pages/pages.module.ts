import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import {FormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import {PipesModule} from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
@NgModule({
    declarations: [
        DashboardComponent,
        PagesComponent,
        AccountSettingsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent
        
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