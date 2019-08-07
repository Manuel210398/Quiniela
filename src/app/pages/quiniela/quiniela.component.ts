import { Component, OnInit } from '@angular/core';
import { PartidoService } from 'src/app/services/partidos/partido.service';
import { Partido } from 'src/models/partidos.model';
import { Jornada } from 'src/models/jornada.model';
import { EquiposService } from 'src/app/services/equipos/equipos.service';
import { Equipo } from 'src/models/equipo.model';
import { Pronostico } from 'src/models/pronostico.model';
import { PronosticosService } from 'src/app/services/pronosticos/pronosticos.service';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-quiniela',
  templateUrl: './quiniela.component.html',
  styles: []
})
export class QuinielaComponent implements OnInit {

  constructor(public _partidoService :PartidoService,
    public _equipoService: EquiposService, 
    public _pronosticoService:PronosticosService,
    public _usuarioService: UsuarioService) { }
  partidos:Partido[]=[];
  equipos:Equipo[]=[];
  jornadas:Jornada[]=[];
  pronostico: Pronostico = new Pronostico();
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
      this.pronostico=resp.partidos;
        this.partidos=resp.partidos;
        this.partido=resp.partidos;
        console.log(this.partidos);
        console.log(this.partido);
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
  
  GuardarMarcador(partido: Partido)
  {
    var pronostico= new Pronostico();
    
    console.log(partido._id);
    pronostico.partido= partido._id;
    pronostico.usuario= this._usuarioService.usuario._id;
    pronostico.puntosAnfitrion= partido.puntosAnfitrion;
    pronostico.puntosVisitante= partido.puntosVisitante;
    console.log(pronostico.puntosAnfitrion,pronostico.puntosVisitante);
    this._pronosticoService.actualizarPronostico(pronostico)
    .subscribe((resp:any)=>
    {
      this.pronostico=resp;
      console.log(resp);
    });
  }
}
