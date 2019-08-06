import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuinielasService } from 'src/app/services/quinielas/quinielas.service';
import { Quiniela } from 'src/models/quiniela.model';
import { TorneosService } from 'src/app/services/torneos/torneos.service';
import { Torneo } from 'src/models/torneo.model';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/models/usuario.model';

@Component({
  selector: 'app-quiniela-unitaria',
  templateUrl: './quiniela-unitaria.component.html',
  styles: []
})
export class QuinielaUnitariaComponent implements OnInit {
  torneo: any;
  torneos:Torneo[]=[];
  usuarios:Usuario[]=[];
  participantes: Quiniela[]=[];
  quiniela: Quiniela= new Quiniela();
  constructor(public router: Router, public _activatedRoute: ActivatedRoute,
    public _quinielaService: QuinielasService, public _torneosService: TorneosService, public _usuarioService: UsuarioService) { 



    
    this._activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.torneo =  params['idTorneo'];
      if (id !== 'nuevo') {
        this.cargarQuiniela(id)
        //this.estado = true;
      }else{
        //this.jornada.torneo = this.torneo;
      }
    });
  }

  ngOnInit() {
    this.cargarTorneos();
    this.cargarUsuarios();
  }
  cargarQuiniela(id: string) {
    this._quinielaService.obtenerQuiniela(id)
      .subscribe((data: any) => {
        this.quiniela = data.quiniela;
        this.participantes=data.quiniela.participantes;
       // this.torneo = data.jornada.torneo;
        //console.log(this.jornada);
        console.log(this.participantes);
        console.log(this.quiniela);
      });
  }
  cargarTorneos()
  {
    this._torneosService.obtenerTorneos()
    .subscribe((resp:any)=>
    {
      this.torneos=resp.torneos;
      console.log(this.torneos);
    });
  }
  cargarUsuarios()
  {
    this._usuarioService.obtenerUsuarioSinPaginacion()
    .subscribe((resp:any)=>
    {
      this.usuarios= resp.usuarios;
      console.log(this.usuarios);
    });
  }
}
