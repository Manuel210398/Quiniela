import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Quiniela } from 'src/models/quiniela.model';
import { Usuario } from 'src/models/usuario.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Jornada } from 'src/models/jornada.model';

@Injectable({
  providedIn: 'root'
})
export class QuinielasService {

  constructor(public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService) { }

    obtenerQuinielas(){
      let url = URL_SERVICIOS+ '/quiniela';
      return this.http.get(url);
    }
    obtenerQuinielasPorTorneo(id:string){
      let url= URL_SERVICIOS + '/quinielaportorneo/' + id ;
      return this.http.get(url);
    }
    obtenerQuiniela(id:string) {
      let url= URL_SERVICIOS + '/quiniela/' + id ;
      return this.http.get(url);
    }
    agregarParticipante(id:string,idUser:string){
      let url = URL_SERVICIOS + '/quiniela/addUser/'+id+'/'+idUser;
      url += '?token=' + this._usuarioService.token;
      console.log(this._usuarioService.token);
      return this.http.put(url ,{id, idUser}); 
    }
    crearQuiniela(quiniela:Quiniela){
      let url= URL_SERVICIOS+'/quiniela';
      if (quiniela._id){

      }
      else {
        url += '?token=' + this._usuarioService.token;
        return this.http.post(url, quiniela)
        .pipe(map((resp: any) => {
          Swal.fire('Importante', 'El partido se ha Registrado Correctamente', 'success');
          return resp.partido;
        }));
      }

    }
}
