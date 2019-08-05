import {AfterViewInit, Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {JornadaService} from 'src/app/services/jornadas/jornada.service';
import {Jornada} from 'src/models/jornada.model';
import {TorneosService} from 'src/app/services/torneos/torneos.service';
import {Torneo} from 'src/models/torneo.model';
import {NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';

declare const jQuery: any;
declare const $: any;


@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styles: []
})

export class JornadaComponent implements OnInit, AfterViewInit {
  estado: boolean = false;
  jornada: Jornada = new Jornada();
  torneos: Torneo[] = [];
  torneo: any;
  subscriptionTorneo: Subscription;
  constructor(public router: Router, public _activatedRoute: ActivatedRoute, public _jornadaService: JornadaService
    , public _torneoService: TorneosService) {





    this._activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.torneo =  params['idTorneo'];
      if (id !== 'nuevo') {
        this.cargarJornada(id);
        this.estado = true;
      }else{
        this.jornada.torneo = this.torneo;
      }
    });
  }

  ngOnInit() {
    this.cargarTorneos();
  }
  


  cargarTorneos() {
    this._torneoService.obtenerTorneos()
      .subscribe((resp: any) => {
        this.torneos = resp.torneos;
        console.log(this.torneos);
      });
  }

  cargarJornada(id: string) {
    this._jornadaService.obtenerJornada(id)
      .subscribe((data: any) => {
        this.jornada = data.jornada;
        this.torneo = data.jornada.torneo;
        console.log(this.jornada);
      });
  }

  crearJornada(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);
    if (f.invalid) {
      return;
    }
    this._jornadaService.crearJornada(this.jornada)
      .subscribe((jornada) => {
        this.jornada = jornada;
        console.log(this.jornada);
        this.jornada._id = jornada.jornada._id;
        this.router.navigate(['/jornadas', this.torneo]);
      });
  }

  ngAfterViewInit(): void {
    jQuery('.mydatepicker, #datepicker').datepicker();
    jQuery('#datepicker-autoclose').datepicker({
      autoclose: true,
      todayHighlight: true
    });

  }

}
