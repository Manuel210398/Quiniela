import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubirArchivoService,UsuarioService,SharedService,SettingsService,SidebarService ,LoginGuardGuard} from './service.index';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,HttpClientModule
  ],
  providers:
  [
    SettingsService,
    SharedService,SidebarService,ServiceModule,UsuarioService,LoginGuardGuard,SubirArchivoService
  ],
  declarations: []
})
export class ServiceModule { }
