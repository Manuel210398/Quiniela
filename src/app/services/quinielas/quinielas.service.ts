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
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class QuinielasService {
  quiniela:Quiniela;
  constructor(public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService,
    public _subirArchivoServive: SubirArchivoService) { }

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
        url+='/'+quiniela._id;
        url += '?token=' + this._usuarioService.token;
        return this.http.put(url,quiniela)
        .pipe(map((resp:any)=>
          {
            Swal.fire('Importante', 'El partido se ha Actualizado Correctamente', 'success');
            console.log(resp.quiniela);
            return resp.quiniela;
          }));
      }
      else {
        url += '?token=' + this._usuarioService.token;
        return this.http.post(url, quiniela)
        .pipe(map((resp: any) => {
          Swal.fire('Importante', 'El partido se ha Registrado Correctamente', 'success');
          return resp.quiniela;
        }));
      }
    }
    eliminarQuiniela(id:string)
    {   
      let url= URL_SERVICIOS+ '/quiniela/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete(url);
    }
    obtenerQuinielasPaginadasyTorneo(id:string,desde:number)
    {
      let url= URL_SERVICIOS + '/quinielaPaginada/' +id+'?desde=' ;
      console.log(url);
      return this.http.get(url);
    }
    cambiarImagen(archivo: File, id: string) {
      this._subirArchivoServive.subirArchivo(archivo, 'usuarios', id)
        .then((resp: any) => {
          this.quiniela.img = resp.usuario.img;
          Swal.fire('Imagen Actualizado', this.quiniela.nombre, 'success');
        })
        .catch(resp => {
          console.log(resp);
        });
    }
}
