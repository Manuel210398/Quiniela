import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JornadaService } from 'src/app/services/jornadas/jornada.service';
import { Jornada } from 'src/models/jornada.model';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styles: []
})
export class JornadaComponent implements OnInit {
  jornada:Jornada= new Jornada();
  constructor(public router:Router, public _activatedRoute:ActivatedRoute, public _jornadaService: JornadaService) {
    this._activatedRoute.params.subscribe(params=>
      {
        let id= params['id'];
        if (id!=='nuevo')
        {
          this.cargarJornada(id);
        }
      })
   }

  ngOnInit() {
  }
  cargarJornada(id:string) { 
    this._jornadaService.obtenerJornada(id)
    .subscribe((jornada:any)=>
    {
      this.jornada=jornada.jornada;
      console.log(this.jornada);
    })
  }

}
