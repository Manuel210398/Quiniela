import {Component, OnInit} from '@angular/core';
import {PartidoService} from 'src/app/services/partidos/partido.service';
import {Partido} from 'src/models/partidos.model';
import {Jornada} from 'src/models/jornada.model';
import {EquiposService} from 'src/app/services/equipos/equipos.service';
import {Equipo} from 'src/models/equipo.model';
import {UsuarioService} from '../../services/usuario/usuario.service';
import {Usuario} from '../../../models/usuario.model';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: []
})
export class ResultadosComponent implements OnInit {
  partidos: Partido[] = [];
  equipos: Equipo[] = [];
  jornadas: Jornada[] = [];
  usuario: Usuario;

  constructor(public _partidoService: PartidoService,
              public _equipoService: EquiposService,
              public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }


  partido: Partido = new Partido();

  ngOnInit() {
    this.cargarJornadas();
    this.obtenerEquipos();
  }

  cambioJornada(event) {
    console.log(event);
    this._partidoService.obtenerPartidoporJornada(event)
      .subscribe(((resp: any) => {
        this.partidos = resp.partidos;
        console.log(this.partidos);
      }));
  }

  cargarJornadas() {
    this._partidoService.obtenerJornadas()
      .subscribe((resp: any) => {
        console.log(resp);
        this.jornadas = resp.jornadas;
        console.log(this.jornadas);
      });
  }

  obtenerEquipos() {
    this._equipoService.cargarTodosEquipos()
      .subscribe((resp: any) => {
        this.equipos = resp.equipos;
        console.log(this.equipos);
      });
  }

  GuardarMarcador(partido: Partido) {
    this._partidoService.actualizarPartido(partido)
      .subscribe((resp: any) => {
        this.partido = resp;
      });
  }
}
