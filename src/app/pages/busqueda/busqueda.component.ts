import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/models/usuario.model';
import { Estadio } from 'src/models/estadio.model';
import { Torneo } from 'src/models/torneo.model';
import { Equipo } from 'src/models/equipo.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[]=[];
  estadios: Estadio[]=[];
  torneos: Torneo[]=[];
  equipos: Equipo[]=[];



  constructor(public activatedRouter: ActivatedRoute, public http: HttpClient) {
    activatedRouter.params
    .subscribe(params=>
      {
        let termino = params['termino'];
        console.log(termino);
        this.buscar(termino);
      });
   }

  ngOnInit() {
  }
  buscar(termino:string){
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url)
    .subscribe((resp:any)=>
      {
        console.log(resp);
        this.usuarios= resp.usuarios;
        this.equipos= resp.equipos;
        this.torneos= resp.torneos;
        this.estadios= resp.estadios;

      })
  }
}
