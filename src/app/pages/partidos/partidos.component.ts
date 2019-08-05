import { Component, OnInit } from '@angular/core';
import { PartidoService } from 'src/app/services/partidos/partido.service';
import { Partido } from 'src/models/partidos.model';
import { EquiposService } from 'src/app/services/equipos/equipos.service';
import { Equipo } from 'src/models/equipo.model';
import { Jornada } from 'src/models/jornada.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html'
})

export class PartidosComponent implements OnInit {
  
  constructor(public _activatedRoute: ActivatedRoute, public _partidoService: PartidoService,public _equipoService: EquiposService) { }
  partidos:Partido[]=[];
  jornadas:Jornada[]=[];
  equipos:Equipo[]=[];
  jornada: any = '';
  ngOnInit() {


    this._activatedRoute.params.subscribe(params => {
      this.jornada = params['idJornada'];
    });
    this.obtenerPartidos();
    this.obtenerEquipos();
    this.cargarJornadas();
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
  obtenerPartidos(){
    if (this.jornada)
    {
      this._partidoService.obtenerPartidoporJornada(this.jornada)
      .subscribe((resp:any)=>
      {
        //console.log(resp);
        this.partidos= resp.partidos;
        console.log(this.partidos);
      });
    }
  }
  guardarPartido(partido:Partido){
    this._partidoService.actualizarPartido(partido)
    .subscribe(()=>this.obtenerPartidos());
  }
  eliminarPartido(partido:Partido){
    this._partidoService.borrarPartido(partido._id)
    .subscribe(()=>this.obtenerPartidos());
  }
  cambioJornada(event) {
    if (this.jornada)
    {
      console.log(event);
      this.jornada=event;
      this._partidoService.obtenerPartidoporJornada(event)
      .subscribe(((resp:any)=>
      {
          this.partidos=resp.partidos;
          console.log(this.partidos);
      }));
    }
    
    
  }

}
