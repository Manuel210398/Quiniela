import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EquiposService } from 'src/app/services/equipos/equipos.service';
import { PartidoService } from 'src/app/services/partidos/partido.service';
import { Jornada } from 'src/models/jornada.model';
import { JornadaService } from 'src/app/services/jornadas/jornada.service';
import { TorneosService } from 'src/app/services/torneos/torneos.service';
import { Torneo } from 'src/models/torneo.model';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styles: []
})
export class JornadasComponent implements OnInit, OnDestroy{
  jordanas: Jornada[] = [];
  torneos: Torneo[] = [];
  torneo: any = '';
  subscriptionTorneo: Subscription;

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _EquipoService: EquiposService,
    public _jornadaService: JornadaService, public _torneoService: TorneosService) { }

  ngOnInit() {
    this.cargarTorneos();

    this.torneo = this._torneoService.getTorneoValue();

    this.subscriptionTorneo = this._torneoService.getTorneo().subscribe(torneo =>
      {
        console.log('cambie Torneo en jornadas:'+torneo)
        if (torneo !== ''){
          console.log('cambie torneo por subscriber'+this.torneo);

          this.torneo = torneo;
          this.cargarJornadas();
        }

      });




      this._activatedRoute.params.subscribe(params => {

        let torneo = params['idTorneo'];
        if(torneo){
          this.torneo = torneo;
          console.log('cambie torneo por ROUTER'+this.torneo);
        }

      });
  }
  
  cargarJornadas()
  {
    if(this.torneo){
      this._jornadaService.obtenerJornadasPorTorneo(this.torneo)
        .subscribe((data:any)=>
        {
          this.jordanas = data.jornadas;
          console.log(this.jordanas);
        });
    }

  }

  cargarTorneos()
  {
    this._torneoService.obtenerTorneos()
    .subscribe((resp:any)=>
    {
      this.torneos = resp.torneos;
      //console.log(this.torneos);
      
    });
  }

  cambioTorneo() {

    if (this.torneo && this.torneo !=='')
    {
      this._torneoService.setTorneo(this.torneo);
      console.log(this.torneo);
      //this.torneo = event;
      
      this._jornadaService.obtenerJornadasPorTorneo(this.torneo)
      .subscribe((resp: any)=>
      {
        this.jordanas = resp.jornadas;
        console.log(this.jordanas);
      });
    }
  }

  eliminarJornada(jornada:Jornada){
    this._jornadaService.eliminarJornada(jornada._id)
    .subscribe(()=>{
      this.cargarJornadas();
      Swal.fire('Importante', 'La Jornada se ha Eliminado Correctamente', 'success');
    });
  }
  ngOnDestroy()
  {
    this.subscriptionTorneo.unsubscribe();
  }
}
