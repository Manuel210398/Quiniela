import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EquiposService } from 'src/app/services/equipos/equipos.service';
import { PartidoService } from 'src/app/services/partidos/partido.service';
import { Jornada } from 'src/models/jornada.model';
import { JornadaService } from 'src/app/services/jornadas/jornada.service';
@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styles: []
})
export class JornadasComponent implements OnInit {
  jordanas:Jornada[]=[];
  constructor(public _EquipoService: EquiposService, public _partidoService: PartidoService, public _jornadaService: JornadaService) { }

  ngOnInit() {
    this.cargarJornadas();
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
  
  

}
