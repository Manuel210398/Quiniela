import { Component, OnInit } from '@angular/core';
import { PartidoService } from 'src/app/services/partidos/partido.service';
import { Partido } from 'src/models/partidos.model';
import { Jornada } from 'src/models/jornada.model';
import { EquiposService } from 'src/app/services/equipos/equipos.service';
import { Equipo } from 'src/models/equipo.model';

@Component({
  selector: 'app-quiniela',
  templateUrl: './quiniela.component.html',
  styles: []
})
export class QuinielaComponent implements OnInit {

  constructor(public _partidoService :PartidoService,public _equipoService: EquiposService) { }
  partidos:Partido[]=[];
  equipos:Equipo[]=[];
  jornadas:Jornada[]=[];
  partido: Partido = new Partido();
  ngOnInit() {
    this.cargarJornadas();
    this.obtenerEquipos();
  }
  cambioJornada(event) {
    console.log(event);
    this._partidoService.obtenerPartidoporJornada(event)
    .subscribe(((resp:any)=>
    {
        this.partidos=resp.partidos;
        console.log(this.partidos);
    }));
  }
  cargarJornadas() { 
    this._partidoService.obtenerJornadas()
    .subscribe((resp:any)=>
    { 
      console.log(resp);
      this.jornadas=resp.jornadas;
      console.log(this.jornadas);
    });
  }
  obtenerEquipos(){
    this._equipoService.cargarTodosEquipos()
    .subscribe((resp:any)=>
    {
        this.equipos=resp.equipos;
        console.log(this.equipos);
    });
  }
  GuardarMarcador(partido:Partido)
  {
    this._partidoService.actualizarPartido(partido)
    .subscribe((resp:any)=>
    {
      this.partido=resp;
    });
  }
}
