import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  constructor(public http: HttpClient,
    public router: Router) { }


  obtenerJornada(id:string)
  {
    let url = URL_SERVICIOS + '/jornada/' + id;
    return this.http.get(url);
  }
}
