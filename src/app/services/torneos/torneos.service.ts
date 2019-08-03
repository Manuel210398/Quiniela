import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Torneo } from 'src/models/torneo.model';

@Injectable({
  providedIn: 'root'
})
export class TorneosService {

  constructor(public http: HttpClient, public router: Router,public _usuarioService: UsuarioService) { }
  obtenerTorneos()
  {
    let url = URL_SERVICIOS + '/torneos';
    return this.http.get(url);
  }
  obtenerTorneosPaginados(desde:number)
  {
    let url = URL_SERVICIOS + '/torneos/pages?desde=' + desde;
    return this.http.get(url);
  }
  crearEquipo(nombre: string) {
    let url = URL_SERVICIOS + '/torneo';
    url += '?token=' + this._usuarioService.token;
    return this.http.post(url, {nombre})
      .pipe(map((resp: any) => {
        resp;
      }));
  }
  actualizarTorneo(torneo: Torneo) {
    let url = URL_SERVICIOS + '/torneo/' + torneo._id;
    url += '?token=' + this._usuarioService.token;
    console.log(this._usuarioService.token);
    return this.http.put(url, torneo)
      .pipe(map((resp: any) => {
        resp;
      }));
  }
  eliminarTorneo(id:string)
  {
    let url = URL_SERVICIOS + '/torneo/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
      .pipe(map(resp => {
       resp;
      }));
  }
  buscarTorneo(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/torneos/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.torneos));
  }
}
