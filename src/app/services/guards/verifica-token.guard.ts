import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {CanActivate, Router} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { promise } from 'protractor';
import { resolve } from 'path';
@Injectable()


export class VerificaTokenGuard implements CanActivate {

constructor(public _usuarioService:UsuarioService, public router: Router){}

  canActivate(): Promise<boolean> | boolean{
    console.log('TOken guard');
    let token= this._usuarioService.token;
    console.log(token);
    let payload = JSON.parse(atob(token.split('.')[1]));
    let expirado = this.expirado(payload.exp);
    if (expirado){
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenueva(payload.exp);
  }
  verificaRenueva(fechaExpiracion:number): Promise<boolean>{
    return new Promise((resolve , reject)=>
    {
      let tokenExp= new Date (fechaExpiracion * 1000);
      let ahora = new Date();
      ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000));
      console.log(tokenExp);
      console.log(ahora);
      if ( tokenExp.getTime() > ahora.getTime() ){
        resolve(true);
      }
      else{
        this._usuarioService.renuevaToken()
        .subscribe(()=>
        {
          resolve(true);
        }, ()=>
        {
          reject(false);
          this.router.navigate(['/login']);
        });
      }
      resolve (true);
    });
  }
  expirado(fechaExpiracion:number){
    let ahora = new Date().getTime()/1000;
    if (fechaExpiracion < ahora ){
      return true;
    }else{
      return false;
    }
  }
}
