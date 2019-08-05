import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JornadaService } from 'src/app/services/jornadas/jornada.service';
import { Jornada } from 'src/models/jornada.model';
import { TorneosService } from 'src/app/services/torneos/torneos.service';
import { Torneo } from 'src/models/torneo.model';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styles: []
})
export class JornadaComponent implements OnInit {
  estado:boolean=false;
  jornada:Jornada= new Jornada();
  torneos:Torneo[]=[];
  constructor(public router:Router, public _activatedRoute:ActivatedRoute, public _jornadaService: JornadaService
    , public _torneoService: TorneosService) {
    this._activatedRoute.params.subscribe(params=>
      {
        let id= params['id'];
        if (id!=='nuevo')
        {
          this.cargarJornada(id);
          this.estado=true;
        }
      })
   }

  ngOnInit() {
    this.cargarTorneos();
  }
  cargarTorneos()
  {
    this._torneoService.obtenerTorneos()
    .subscribe((resp:any)=>
    {
      this.torneos=resp.torneos;
      console.log( this.torneos);
    });
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
