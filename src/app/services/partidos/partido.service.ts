import {Injectable} from '@angular/core';
import {URL_SERVICIOS} from 'src/app/config/config';
import {UsuarioService} from '../usuario/usuario.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Partido} from 'src/models/partidos.model';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  constructor(public _usuarioService: UsuarioService, public http: HttpClient,
              public router: Router,) {
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
    let url = URL_SERVICIOS + '/partido';
    if (partido._id)
    {
      url+='/'+partido._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url,partido)
      .pipe(map((resp:any)=>
        {
          Swal.fire('Importante', 'El partido se ha Actualizado Correctamente', 'success');
          console.log(resp.partido);
          return resp.partido;
        }));
    }else{
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, partido)
        .pipe(map((resp: any) => {
          Swal.fire('Importante', 'El partido se ha Registrado Correctamente', 'success');
          return resp.partido;
        }));
    }
  }

  actualizarPartido(partido: Partido) {
    let url = URL_SERVICIOS + '/partido/' + partido._id;
    url += '?token=' + this._usuarioService.token;
    console.log(this._usuarioService.token);
    return this.http.put(url, partido)
      .pipe(map((resp: any) => {
        resp.partido;
        Swal.fire('Estadio Actualizado', 'El Partido se he Actualizado Correctamente', 'success');
      }));
  }

  borrarPartido(id: string) {
    let url = URL_SERVICIOS + '/partido/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
      .pipe(map(resp => {
        Swal.fire('Partido Eliminado', 'Eliminado Correctamente', 'success');
      }));
  }
  obtenerJornadas()
  {
    let url = URL_SERVICIOS + '/jornada';
    return this.http.get(url);
  }
  obtenerPartidoporJornada(id:string)
  {
    let url = URL_SERVICIOS + '/partidoporjornada/'+ id;
    return this.http.get(url);
  }

}
