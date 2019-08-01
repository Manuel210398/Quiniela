import { Component, OnInit } from '@angular/core';
import { EquiposService } from 'src/app/services/equipos/equipos.service';
import { Equipo } from 'src/models/equipo.model';
import { NgForm } from '@angular/forms';
import { Partido } from 'src/models/partidos.model';
import { PartidoService } from 'src/app/services/partidos/partido.service';
import { Estadio } from 'src/models/estadio.model';
import { EstadioService } from 'src/app/services/estadios/estadio.service';
import { Route, Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styles: []
})
export class PartidoComponent implements OnInit {

  equipos:Equipo[]=[];
  partido:Partido= new Partido('','');
  estadio:Estadio[]=[];
  equipo:Equipo = new Equipo('','','','','');
  equipo2:Equipo = new Equipo('','','','','');
  constructor(public _estadioService: EstadioService,   public _equipoService: EquiposService, public _partidoService:PartidoService,
    public router:Router, public _activatedRoute:ActivatedRoute) {
      _activatedRoute.params.subscribe(params=>
        {
          let id= params['id'];
          if (id!=='nuevo')
          {
            this.cargarPartido(id);
          }
        })
     }

  ngOnInit() {
    this.cargarEquipos();
  }
  cargarPartido(id:string)
  {
    this._partidoService.obtenerPartido(id)
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.partido= resp.partido;
      this.equipo=resp.partido.anfitrion;
      this.equipo2=resp.partido.visitante;
      console.log(this.equipo);
      this.cambioEstadio(this.equipo);
      this.cambioEstadioDos(this.equipo2);
    });
  }
  cargarEquipos()
  { 
    this._equipoService.cargarTodosEquipos()
    .subscribe((resp:any)=>
    {
      console.log(resp);
      this.equipos= resp.equipos;
    });
  }
  guardarPartido(f:NgForm)
  {
    console.log(f.valid);
    console.log(f.value);
    if (f.invalid){
      return;
    }
    this._partidoService.crearPartido(this.partido)
    .subscribe((partido)=>
    {
      this.partido=partido;
      console.log(this.partido);
      this.partido._id=partido._id;
      this.router.navigate(['/partido',partido._id]);
    });
    
  }
  cambioEstadio(event)
  {
    console.log(event);
    this._equipoService.obtenerEquipo(event)
    .subscribe( (equipo) => {
      this.equipo = equipo;
      console.log(equipo);
    });
  }
  cambioEstadioDos(event)
  {
    console.log(event);
    this._equipoService.obtenerEquipo(event)
    .subscribe( (equipo) => {
      this.equipo2 = equipo;
      console.log(equipo);
    });
  }
}
