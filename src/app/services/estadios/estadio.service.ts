import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UsuarioService} from '../usuario/usuario.service';
import {URL_SERVICIOS} from 'src/app/config/config';
import {map} from 'rxjs/operators';
import {Estadio} from 'src/models/estadio.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EstadioService {

  constructor(public http: HttpClient,
              public router: Router,
              public _usuarioService: UsuarioService) {
    console.log('Servicio de estadio listo');
  }

  cargarTodosEstadios() {
    let url = URL_SERVICIOS + '/estadio/s';
    return this.http.get(url);
  }

  cargarEstadios(desde: number) {
    let url = URL_SERVICIOS + '/estadio?desde=' + desde;
    return this.http.get(url);
  }

  buscarEstadioId(id: string) {
    let url = URL_SERVICIOS + '/estadio/' + id;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.estadios));
  }

  buscarEstadios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/estadios/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.estadios));
  }

  crearEstadio(nombre: string) {
    let url = URL_SERVICIOS + '/estadio';
    url += '?token=' + this._usuarioService.token;
    return this.http.post(url, {nombre})
      .pipe(map((resp: any) => {
        resp.estadios;
      }));
  }

  actualizarEstadio(estadio: Estadio) {
    let url = URL_SERVICIOS + '/estadio/' + estadio._id;
    url += '?token=' + this._usuarioService.token;
    console.log(this._usuarioService.token);
    return this.http.put(url, estadio)
      .pipe(map((resp: any) => {
        resp.estadio;
        Swal.fire('Estadio Actualizado', 'El Estadio se he Actualizado Correctamente', 'success');
      }));
  }

  borrarEstadio(id: string) {
    let url = URL_SERVICIOS + '/estadio/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
      .pipe(map(resp => {
        Swal.fire('Equipo Eliminado', 'Eliminado Correctamente', 'success');
      }));
  }
}
