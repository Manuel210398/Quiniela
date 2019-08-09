import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo:string='usuario'): any {
    let url = URL_SERVICIOS + '/img';
    if (!img){
      return url + '/usuarios/xxx'
    }
    if (img.indexOf('https')>=0)
    {
      return img;
    }
    switch(tipo)
    {
      case 'usuario':
         url+='/usuarios/'+img;
      break;
      case 'equipos':
         url+='/equipos/'+img;
      break;
      case 'estadios':
         url+='/estadios/'+img;
      break;
      case 'quinielas':
        url+='/quinielas/'+img;
     break;
      default:
        console.log('tipo de imagen no existe')
        url+='/usuarios/xxx';
      }
    return url;
  }
}
