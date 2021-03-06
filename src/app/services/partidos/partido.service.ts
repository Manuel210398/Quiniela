import {Injectable} from '@angular/core';
import {URL_SERVICIOS} from 'src/app/config/config';
import {UsuarioService} from '../usuario/usuario.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Partido} from 'src/models/partidos.model';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  constructor(public _usuarioService: UsuarioService, public http: HttpClient,
              public router: Router) {
  }


  obtenerPartidos() {
    let url = URL_SERVICIOS + '/partido';
    return this.http.get(url);
  }

  obtenerPartido(id: string) {
    let url = URL_SERVICIOS + '/partido/' + id;
    return this.http.get(url);
  }


  crearPartido(partido: Partido) {

    const headers = new HttpHeaders({
      'x-token': this._usuarioService.token
    });

    let url = URL_SERVICIOS + '/partido';
    if (partido._id)
    {
      url+='/'+partido._id;
      //url += '?token=' + this._usuarioService.token;
      return this.http.put(url,partido,{headers})
      .pipe(map((resp:any)=>
        {
          Swal.fire('Importante', 'El partido se ha Actualizado Correctamente', 'success');
          console.log(resp.partido);
          return resp.partido;
        }));
    }else{
      //url += '?token=' + this._usuarioService.token;
      return this.http.post(url, partido,{headers})
        .pipe(map((resp: any) => {
          Swal.fire('Importante', 'El partido se ha Registrado Correctamente', 'success');
          return resp.partido;
        }));
    }
  }

  actualizarPartido(partido: Partido) {
    const headers = new HttpHeaders({
      'x-token': this._usuarioService.token
    });


    let url = URL_SERVICIOS + '/partido/' + partido._id;
    //url += '?token=' + this._usuarioService.token;
    //console.log(this._usuarioService.token);
    return this.http.put(url, partido, {headers})
      .pipe(map((resp: any) => {

        Swal.fire('Partido Actualizado', 'El partido se he actualizado correctamente', 'success');
        return resp.partido;
      }));
  }

  borrarPartido(id: string) {

    const headers = new HttpHeaders({
      'x-token': this._usuarioService.token
    });

    let url = URL_SERVICIOS + '/partido/' + id;
    //url += '?token=' + this._usuarioService.token;
    return this.http.delete(url, {headers})
      .pipe(map(resp => {
        Swal.fire('Partido Eliminado', 'Eliminado Correctamente', 'success');
      }));
  }
  /*obtenerJornadas(torneo)
  {
    let url = URL_SERVICIOS + '/jornadas/' + torneo;
    return this.http.get(url);
  }*/
  obtenerJornadas()
  {
    let url = URL_SERVICIOS + '/jornadas/' ;
    return this.http.get(url);
  }
  obtenerPartidoporJornada(id:string)
  {
    let url = URL_SERVICIOS + '/partidoporjornada/'+ id;
    return this.http.get(url);
  }

}
