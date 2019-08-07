import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import { SidebarService } from 'src/app/services/shared/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
//import { SidebarService } from 'src/app/services/shared/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;
  constructor(public _sidebar:SidebarService,public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario= this._usuarioService.usuario;
    this._sidebar.cargarMenu();
  }

}
