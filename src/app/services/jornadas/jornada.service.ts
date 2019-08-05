import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Jornada } from 'src/models/jornada.model';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  constructor(public http: HttpClient,
    public router: Router,public _usuarioService: UsuarioService) { }


  obtenerJornada(id:string)
  {
    let url = URL_SERVICIOS + '/jornada/' + id;
    return this.http.get(url);
  }
  crearJornada(jornada:Jornada)
  {
    let url = URL_SERVICIOS + '/jornada';
    if (jornada._id){
      url+='/'+jornada._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url,jornada)
      .pipe(map((resp:any)=>
        {
          Swal.fire('Importante', 'La Jornada se ha Actualizado Correctamente', 'success');
          console.log(resp);
          return resp;
        }));
    }
    else{
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, jornada)
        .pipe(map((resp: any) => {
          Swal.fire('Importante', 'La Jornada se ha Registrado Correctamente', 'success');
          return resp;
        }));
    }

  }
  obtenerJornadasPorTorneo(id:string)
  {
    let url = URL_SERVICIOS + '/jornada/torneo/'+ id;
    return this.http.get(url);
  }

  eliminarJornada(id:string)
  {
    let url = URL_SERVICIOS + '/jornada/'+ id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url);
  }
}
