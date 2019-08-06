import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class QuinielasService {

  constructor(public http: HttpClient,
    public router: Router) { }

    obtenerQuinielas()
    {
      let url = URL_SERVICIOS+ '/quiniela';
      return this.http.get(url);
    }
    obtenerQuinielasPorTorneo(id:string)
    {
      let url= URL_SERVICIOS + '/quinielaportorneo/' + id ;
      return this.http.get(url);
    }
    obtenerQuiniela(id:string)
    {
      let url= URL_SERVICIOS + '/quiniela/' + id ;
      return this.http.get(url);
    }
}
