import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuinielasService } from 'src/app/services/quinielas/quinielas.service';
import { Quiniela } from 'src/models/quiniela.model';
import { TorneosService } from 'src/app/services/torneos/torneos.service';
import { Torneo } from 'src/models/torneo.model';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quiniela-unitaria',
  templateUrl: './quiniela-unitaria.component.html',
  styles: []
})
export class QuinielaUnitariaComponent implements OnInit, OnDestroy {
  torneo: any;
  torneos:Torneo[]=[];
  usuarios:Usuario[]=[];
  participantes: Quiniela[]=[];
  estado: boolean = false;
  subscriptionTorneo: Subscription;
  quiniela: Quiniela= new Quiniela('','','');
  constructor(public router: Router, public _activatedRoute: ActivatedRoute,
    public _quinielaService: QuinielasService, 
    public _torneosService: TorneosService, 
    public _usuarioService: UsuarioService,
    public _torneoService : TorneosService) { 



    
    this._activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.torneo =  params['idTorneo'];
      if (id !== 'nuevo') {
        this.cargarQuiniela(id)
        this.estado = true;
      }else{
        this.quiniela.torneo = this.torneo;
      }
    });
    this.subscriptionTorneo = this._torneoService.getTorneo().subscribe(torneo=>
      {
        console.log('cambie Torneo en jornada:'+torneo)
        if (torneo){
          this.torneo= torneo;
          console.log(this.torneo);
        }
        else{
          console.log('no');
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
  agregarParticipantes(f: NgForm)
  {
    console.log(f.value.participantes);
    if (f.invalid) {
      return;
    }
    this._quinielaService.agregarParticipante(this.quiniela._id,f.value.participantes)
    .subscribe((resp:any)=>
    {
      console.log(resp);
      //this.cargarParticipantes();
    });
  }
  crearQuiniela(quiniela)
  {
    this._quinielaService.crearQuiniela(this.quiniela)
    .subscribe((quiniela)=>
    {
      this.quiniela=quiniela;
      console.log(quiniela);
      this.quiniela._id=quiniela._id;
      this.router.navigate(['/quinielas',this.torneo]);
    });
  }
  
  ngOnDestroy()
  {
    this.subscriptionTorneo.unsubscribe();
  }

}
