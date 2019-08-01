import {Injectable} from '@angular/core';
import {UsuarioService} from '../usuario/usuario.service';
import {CanActivate, Router} from '@angular/router';

//import { CanActivate } from '@angular/router/src/utils/preactivation';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(
    public router: Router, public _usuarioService: UsuarioService) {
  }

  canActivate() {
    if (this._usuarioService.estaLogueado()) {
      console.log('paso por el login Guard');
      return true;
    } else {
      console.log('bloqueado');
      this.router.navigate(['/login']);
      return false;
    }


  }
}
