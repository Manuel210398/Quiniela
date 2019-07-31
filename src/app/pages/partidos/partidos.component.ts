import { Component, OnInit } from '@angular/core';
import { PartidoService } from 'src/app/services/partidos/partido.service';
import { Partido } from 'src/models/partidos.model';
import { EquiposService } from 'src/app/services/equipos/equipos.service';
import { Equipo } from 'src/models/equipo.model';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html'
})

export class PartidosComponent implements OnInit {
  
  constructor(public _partidoService: PartidoService,public _equipoService: EquiposService) { }
  partidos:Partido[]=[];
  equipos:Equipo[]=[];
  ngOnInit() {
    this.obtenerPartidos();
    this.obtenerEquipos();
  }
  obtenerEquipos()
  {
    this._equipoService.cargarTodosEquipos()
    .subscribe((resp:any)=>
    {
        this.equipos=resp.equipos;
        console.log(this.equipos);
    });
  }
  obtenerPartidos()
  {
    this._partidoService.obtenerPartidos()
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.partidos= resp.partidos;
      console.log(this.partidos);
    });
  }
  guardarPartido(partido:Partido)
  {
    this._partidoService.actualizarPartido(partido)
    .subscribe(()=>this.obtenerPartidos());
  }
  eliminarPartido(partido:Partido)
  {
    this._partidoService.borrarPartido(partido._id)
    .subscribe(()=>this.obtenerPartidos());
  }

}
