import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {JornadaService} from 'src/app/services/jornadas/jornada.service';
import {Jornada} from 'src/models/jornada.model';
import Swal from 'sweetalert2';

//para hacer uso de jQuery
declare const jQuery: any;
declare const $: any;


@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styles: []
})
export class JornadaComponent implements OnInit, AfterViewInit {
  jornada: Jornada = new Jornada();
  torneo: any;

  constructor(public router: Router, public _activatedRoute: ActivatedRoute, public _jornadaService: JornadaService) {

  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
    let id = params['id'];
    this.torneo = params['idTorneo'];
    if (id !== 'nuevo') {
      this.cargarJornada(id);
    }
  });
  }

  ngAfterViewInit() {
    jQuery('.mydatepicker, #datepicker').datepicker({});

  }

  cargarJornada(id: string) {
    this._jornadaService.obtenerJornada(id)
      .subscribe((jornada: any) => {
        this.jornada = jornada.jornada;
        this.torneo = this.jornada.torneo;

        console.log(this.jornada);
      });
  }

  guardarJornada(f) {

    console.log(f.valid);
    console.log(f.value);
    if (f.invalid){
      return;
    }
    this.jornada.torneo = this.torneo;

    this._jornadaService.crearJornada(this.jornada)
     .subscribe((jornada) =>
      {
        this.jornada = jornada;
        console.log(this.jornada);
        //this.jornada._id=jornada._id;
        this.router.navigate(['/jornada', jornada._id]);
      }, (error1) => {
       console.log(error1.error.mensaje);
        Swal.fire("", "Ocurrio un error al crear la jornada. "+ error1.error.mensaje + error1.error.errors.message, 'error');
     });

  }



}
