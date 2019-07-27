import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';
import { Equipo } from 'src/models/equipo.model';
import { URL } from 'url';


@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService) 
    { 
      console.log('Servicio listo');
    }
  cargarEquipos(desde:number)
  {
    let url= URL_SERVICIOS + '/equipo?desde='+desde;
    return this.http.get(url);
  }
  obtenerEquipo(id:string)
  {
    let url= URL_SERVICIOS +'/equipo/'+id;
    return this.http.get(url)
    .pipe(map((resp:any)=>resp.equipos));
  }
  borrarEquipo(id:string)
  {
    let url = URL_SERVICIOS + '/equipo/'+id;
    url+='?token='+ this._usuarioService.token;
    return this.http.delete(url)
    .pipe(map(resp=>
      {
        Swal.fire ('Equipo Eliminado','Eliminado Correctamente','success');
      }));
  }
  crearEquipo(nombre:string,alias:string)
  {
    let url = URL_SERVICIOS +'/equipo';
    url+='?token=' + this._usuarioService.token;
    return this.http.post(url,{nombre,alias})
    .pipe(map((resp:any)=>
      {
        resp.equipos;
      }));
  }
  buscarEquipo(termino:string)
  {
    let url= URL_SERVICIOS +'/busqueda/coleccion/equipos/'+termino;
    return this.http.get(url)
    .pipe(map((resp:any)=>resp.equipos));
  }
  actualizarEquipo(equipo:Equipo){
    let url= URL_SERVICIOS+ '/equipo/' + equipo._id;
    url+='?token='+ this._usuarioService.token;
    return this.http.put(url,equipo)
    .pipe(map((resp:any)=>
      {
        resp.equipo;
        Swal.fire ('Equipo Actualizado','El Equipo se he Actualizado Correctamente','success');
      }));
  }
}
