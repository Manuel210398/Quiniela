import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
import {Usuario} from 'src/models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';

declare function init_plugins();

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) {
  }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
        .subscribe
        (resp => {
          //console.log(resp);
          console.log(token);
          Swal.fire('Bienvenido', 'hola', 'success');
          this.router.navigate(['/dashboard']);
        });
      console.log(token);
    });
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '451464885430-t8r1io325v30rj8f8i6l51o0c72nfori.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }
    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(
        resp => {
          console.log(resp);
          Swal.fire('Bienvenido', usuario.email, 'success');
          this.router.navigate(['/dashboard']);

        }, err => {
          Swal.fire('Error', 'Verifique su Correo o Contraseña', 'error');
        });
  }

  //this.router.navigate([ '/dashboard' ]);


}
