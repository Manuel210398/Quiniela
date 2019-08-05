import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EquiposService } from 'src/app/services/equipos/equipos.service';
import { PartidoService } from 'src/app/services/partidos/partido.service';
import { Jornada } from 'src/models/jornada.model';
import { JornadaService } from 'src/app/services/jornadas/jornada.service';
import { TorneosService } from 'src/app/services/torneos/torneos.service';
import { Torneo } from 'src/models/torneo.model';
@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styles: []
})
export class JornadasComponent implements OnInit {
  jordanas:Jornada[]=[];
  torneos:Torneo[]=[];
  constructor(public _EquipoService: EquiposService, public _partidoService: PartidoService, 
    public _jornadaService: JornadaService, public _torneoService: TorneosService) { }

  ngOnInit() {
    this.cargarJornadas();
    this.cargarTorneos();
  }
  cargarJornadas()
  {
    this._partidoService.obtenerJornadas()
    .subscribe((jordanas:any)=>
    {
      this.jordanas=jordanas.jornadas;
      console.log(this.jordanas);
    });
  }
  cargarTorneos()
  {
    this._torneoService.obtenerTorneos()
    .subscribe((resp:any)=>
    {
      this.torneos= resp.torneos;
      console.log(this.torneos);
    });
  }
  cambioTorneo(event) {
    console.log(event);
    this._jornadaService.obtenerJornadasPorPartido(event)
    .subscribe((resp:any)=>
    {
      this.jordanas=resp.jornadas;
      console.log(this.jordanas);
    });
  }
  eliminarJornada(jornada:Jornada){
    this._jornadaService.eliminarJornada(jornada._id)
    .subscribe(()=>{
      this.cargarJornadas();
      Swal.fire('Importante', 'La Jornada se ha Eliminado Correctamente', 'success');
    });
  }
}
