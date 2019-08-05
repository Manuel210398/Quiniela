import {AfterViewInit, Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EquiposService } from 'src/app/services/equipos/equipos.service';
import { PartidoService } from 'src/app/services/partidos/partido.service';
import { Jornada } from 'src/models/jornada.model';
import { JornadaService } from 'src/app/services/jornadas/jornada.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styles: []
})
export class JornadasComponent implements OnInit {
  jordanas: Jornada[] = [];
  torneo: any = '';
  torneos: any[] = [];




  constructor(public router: Router,
              public _activatedRoute: ActivatedRoute,
              public _EquipoService: EquiposService,
              public _partidoService: PartidoService,
              public _jornadaService: JornadaService) {



  }

  ngOnInit() {
    this.cargarTorneos();

    this._activatedRoute.params.subscribe(params => {
      this.torneo = params['idTorneo'];
    });
    this.cambioTorneo();

  }
  cambioTorneo() {
    if (this.torneo) {
      this._partidoService.obtenerJornadas(this.torneo)
        .subscribe((jordanas: any) => {
          this.jordanas = jordanas.jornadas;
          console.log(this.jordanas);
        });
    } else {
      this.jordanas = [];
    }

  }


  cargarTorneos() {
    this._jornadaService.obtenerTorneos()
      .subscribe((data: any) => {
        this.torneos = data.torneos;
        console.log(this.torneos);
      });
  }

}


