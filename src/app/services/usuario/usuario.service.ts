import {Injectable} from '@angular/core';
import {Usuario} from 'src/models/usuario.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL_SERVICIOS} from 'src/app/config/config';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {SubirArchivoService} from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any = [];
  constructor(public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    this.cargarStorge();
    console.log('Servicio Listo');
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  renuevaToken()
  {
    const headers = new HttpHeaders({
      'x-token': this.token
  });


    let url = URL_SERVICIOS + '/login/renuevatoken';
    //url += '?x-token=' +this.token;
    return this.http.get(url,{ headers })
    .pipe(map((resp:any)=>
    {
      this.token= resp.token;
      localStorage.setItem('token', this.token);
      console.log('token Renovado');
      return true;
    }));
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(map((resp: any) => {
      Swal.fire('Importante', 'Te has Registrado Correctamente', 'success');
      return resp.usuario;
    }));
  }

  cargarStorge() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu=[];
    }
  } 

  guardarStorage(id: string, token: string, usuario: Usuario, menu:any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu= menu;
  }

  loginGoogle(token: string) {
    const headers = new HttpHeaders({
      'x-token': this.token
  });

    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token})
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        console.log (resp);
        return true;
      }));

  }

  login(usuario: Usuario, recuerdame: boolean = false) {
    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      console.log (resp);
      return true;
    }));
    
  }

  logOut() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  actualizarUsuario(usuario: Usuario) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    //url += '?token=' + this.token;
    console.log(url);
    return this.http.put(url, usuario,{headers}).pipe(map((resp: any) => {
      //this.usuario= resp.usuario;
      if (usuario._id === this.usuario._id) {
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
      }
      Swal.fire('Usuario Actualizado', usuario.nombre, 'success');
      return true;
    }));
  }

  cambiarImagen(archivo: File, id: string) {


    
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire('Imagen Actualizado', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });
    
    let url = URL_SERVICIOS + '/usuarios/page?desde=' + desde;
    return this.http.get(url,{ headers });
  }

  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.usuarios));
  }

  borrarUsuarios(id: string) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    let url = URL_SERVICIOS + '/usuario/' + id;
    //url += '?token=' + this.token;
    return this.http.delete(url,{headers}).pipe(map(resp => {
      Swal.fire(
        'Borrado!!',
        'Tu Usuario ha sido Eliminado',
        'success'
      );
      return true;
    }));
  }

  guardarUsuarios(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
  }
  obtenerUsuarioSinPaginacion()
  {
    let url= URL_SERVICIOS + '/usuarios/';
    return this.http.get(url);
  }
}
