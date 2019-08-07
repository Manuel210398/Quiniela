import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {QuinielasService} from 'src/app/services/quinielas/quinielas.service';
import {Quiniela} from 'src/models/quiniela.model';
import {TorneosComponent} from '../torneos/torneos.component';
import {TorneosService} from 'src/app/services/torneos/torneos.service';
import {Torneo} from 'src/models/torneo.model';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

declare const jQuery: any;
declare const $: any;

@Component({
  selector: 'app-quinielas',
  templateUrl: './quinielas.component.html',
  styles: []
})
export class QuinielasComponent implements OnInit, AfterViewInit, OnDestroy {
  quinielas: Quiniela[] = [];
  torneos: Torneo[] = [];
  torneo: any = '';
  subscriptionTorneo: Subscription;

  constructor(public _quinielaService: QuinielasService,
              public _torenoService: TorneosService, public _activatedRoute: ActivatedRoute
  ) {
    this.obtenerTorneos();
    //this.obtenerQuiniela();
  }

  ngOnInit() {
    this.subscriptionTorneo = this._torenoService.getTorneo().subscribe(data => {
      this.torneo = data;
    }) ;
    /*this._activatedRoute.params.subscribe(params => {
      let torneo = params['idTorneo'];
      console.log('cambie torneo por ROUTER' + this.torneo);
      if (torneo) {
        this.torneo = params['idTorneo'];
      }
    });*/
  }/*
  obtenerQuiniela()
  {
    this._quinielaService.obtenerQuinielas()
    .subscribe((resp:any)=>
    {
      this.quinielas=resp.quinielas;
      console.log( this.quinielas);
    });
  }*/
  obtenerTorneos() {
    this._torenoService.obtenerTorneos()
      .subscribe((resp: any) => {
        this.torneos = resp.torneos;
        console.log('torneos: ' + this.torneos);
        if (this.torneos) {

        }
        $('.my-select').selectpicker('refresh');
      });
  }

  cambioTorneo() {
    if (this.torneo) {
      this._quinielaService.obtenerQuinielasPorTorneo(this.torneo)
        .subscribe((resp: any) => {
          this.quinielas = resp.quinielas;
          console.log(this.quinielas);
        });
    }
  }

  ngAfterViewInit(): void {
    $('.my-select').selectpicker('refresh');

  }

  ngOnDestroy(): void {
    this.subscriptionTorneo.unsubscribe();
  }



}
