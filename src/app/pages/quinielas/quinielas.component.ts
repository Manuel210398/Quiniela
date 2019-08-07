import { Component, OnInit } from '@angular/core';
import { QuinielasService } from 'src/app/services/quinielas/quinielas.service';
import { Quiniela } from 'src/models/quiniela.model';
import { TorneosComponent } from '../torneos/torneos.component';
import { TorneosService } from 'src/app/services/torneos/torneos.service';
import { Torneo } from 'src/models/torneo.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quinielas',
  templateUrl: './quinielas.component.html',
  styles: []
})
export class QuinielasComponent implements OnInit {
  quinielas:Quiniela[]=[];
  torneos:Torneo[]=[];
  torneo: any = '';
  constructor(public _quinielaService: QuinielasService, 
    public _torenoService: TorneosService,public _activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.obtenerTorneo();
    this.obtenerQuiniela();
    this._activatedRoute.params.subscribe(params => {
      this.torneo = params['idTorneo'];
      console.log('cambie torneo por ROUTER'+this.torneo);
    });
  }
  obtenerQuiniela()
  {
    this._quinielaService.obtenerQuinielas()
    .subscribe((resp:any)=>
    {
      this.quinielas=resp.quinielas;
      console.log( this.quinielas);
    });
  }
  obtenerTorneo()
  {
    this._torenoService.obtenerTorneos()
    .subscribe((resp:any)=>
    {
      this.torneos= resp.torneos;
      console.log(this.torneos);
    });
  }
  cambioTorneo(event) {
    if (event)
    {
      this._quinielaService.obtenerQuinielasPorTorneo(event)
      .subscribe((resp:any)=>
      {
        this.quinielas=resp.quinielas;
        console.log(this.quinielas);
      });
    }
  }
}
