import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Pronostico } from 'src/models/pronostico.model';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PronosticosService {

  constructor(public http: HttpClient,
    public router: Router,public _usuarioService: UsuarioService) { }

  obtenerPronostico(){
    let url= URL_SERVICIOS + '/pronostico';
    return this.http.get(url);
  }
  actualizarPronostico(pronostico:Pronostico){
    let url = URL_SERVICIOS + '/pronostico';
    url += '?token=' + this._usuarioService.token;
    console.log(this._usuarioService.token);
    console.log(pronostico);
    return this.http.post(url, pronostico)
      .pipe(map((resp: any) => {
        resp;
        Swal.fire('Partido Actualizado', 'El partido se he actualizado correctamente', 'success');
        console.log(resp);
      }));
  }
}
