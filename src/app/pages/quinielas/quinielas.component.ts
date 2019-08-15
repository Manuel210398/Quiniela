import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {QuinielasService} from 'src/app/services/quinielas/quinielas.service';
import {Quiniela} from 'src/models/quiniela.model';
import {TorneosService} from 'src/app/services/torneos/torneos.service';
import {Torneo} from 'src/models/torneo.model';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ModalUploadService} from 'src/app/components/modal-upload/modal-upload.service';

declare const jQuery: any;
declare const $: any;

@Component({
  selector: 'app-quinielas',
  templateUrl: './quinielas.component.html',
  styles: []
})

export class QuinielasComponent implements OnInit, OnDestroy, AfterViewInit {
  desde: number = 0;
  quinielas: Quiniela[] = [];
  torneos: Torneo[] = [];
  estado: boolean = false;
  torneo: any = '';
  totalRegistro: number = 0;
  subscriptionTorneo: Subscription;

  constructor(public _quinielaService: QuinielasService,
              public _torenoService: TorneosService,
              public _activatedRoute: ActivatedRoute,
              public _torneoService: TorneosService,
              public _modalUploadService: ModalUploadService
  ) {
  }

  ngOnInit() {
    this.obtenerTorneos();
    this.subscriptionTorneo = this._torneoService.getTorneo().subscribe(torneo => {
      console.log('cambie Torneo en jornadas:' + torneo);
      if (torneo) {
        this.torneo = torneo;
        this.obtenerQuinielaPaginadayTorneo();
      } else {
        console.log('no');
      }
    });
    this.torneo = this._torneoService.getTorneo();
    this._activatedRoute.params.subscribe(params => {
      this.torneo = params['idTorneo'];
      console.log('cambie torneo por ROUTER' + this.torneo);
    });
  }



  /*
  obtenerQuiniela()
  {
    this._quinielaService.obtenerQuinielasPorTorneo(this.torneo)
    .subscribe((resp:any)=>
    {
      this.quinielas=resp.quinielas;
      console.log( this.quinielas);
      this.estado=true;
    });
  }*/
  obtenerTorneos() {
    this._torenoService.obtenerTorneos()

      .subscribe((resp: any) => {
        this.torneos = resp.torneos;
        console.log(this.torneos);
      });
  }

  cambioTorneo() {
    if (this.torneo) {
      this._torneoService.setTorneo(this.torneo);
      console.log(this.torneo);
      //this.torneo = event;
      this.obtenerQuinielaPaginadayTorneo();

    }
  }

  eliminarQuiniela(quiniela: Quiniela) {
    this._quinielaService.eliminarQuiniela(quiniela._id)
      .subscribe(() => this.obtenerQuinielaPaginadayTorneo());
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    console.log(desde);
    if (desde >= this.totalRegistro) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    console.log(this.desde);
    this.obtenerQuinielaPaginadayTorneo();
  }

  obtenerQuinielaPaginadayTorneo() {
    this._quinielaService.obtenerQuinielasPaginadasyTorneo(this.torneo, this.desde)
      .subscribe((resp: any) => {
        this.quinielas = resp.quinielas;
        console.log(this.quinielas);

        this.totalRegistro = resp.total;
        console.log(this.totalRegistro);
        this.estado = true;

      });
  }

  mostrarModal(quiniela: Quiniela) {
    this._modalUploadService.mostrarModal('quinielas', quiniela._id);
    this.obtenerQuinielaPaginadayTorneo();
  }

  ngOnDestroy() {
    this.subscriptionTorneo.unsubscribe();
  }

  ngAfterViewInit(): void {
    $('.my-select').selectpicker('refresh');

  }




}
