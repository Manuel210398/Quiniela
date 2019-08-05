import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {URL_SERVICIOS} from 'src/app/config/config';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Jornada} from '../../../models/jornada.model';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  constructor(public _usuarioService: UsuarioService, public http: HttpClient,
              public router: Router) {
  }


  obtenerJornada(id: string) {
    let url = URL_SERVICIOS + '/jornada/' + id;
    return this.http.get(url);
  }

  obtenerJornadas() {
    let url = URL_SERVICIOS + '/jornada';
    return this.http.get(url);
  }

  obtenerTorneos() {
    let url = URL_SERVICIOS + '/torneos';
    return this.http.get(url);
  }

  crearJornada(jornada: Jornada) {
    let url = URL_SERVICIOS + '/jornada';
    if (jornada._id) {
      url += '/' + jornada._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, jornada)
        .pipe(map((resp: any) => {
          Swal.fire('Importante', 'La jornada se ha actualizado correctamente', 'success');
          console.log(resp.partido);
          return resp.partido;
        }));
    } else {
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, jornada)
        .pipe(map((resp: any) => {
          Swal.fire('Importante', 'La jornada se ha registrado correctamente', 'success');
          return resp.partido;
        }));
    }
  }


}
