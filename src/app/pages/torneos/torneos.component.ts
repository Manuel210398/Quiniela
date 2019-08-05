import { Component, OnInit, OnDestroy } from '@angular/core';
import { Torneo } from 'src/models/torneo.model';
import { TorneosService } from 'src/app/services/torneos/torneos.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styles: []
})
export class TorneosComponent implements OnDestroy {
 
  torneos:Torneo[]=[];
  desde:number=0;
  totalRegistro:number=0;
  subscriptionTorneo: Subscription;
  constructor(public _torneosService: TorneosService ) { }

  ngOnInit() {
    this.obtenerTorneosPaginados();
  }
  obtenerTorneos()
  {
    this._torneosService.obtenerTorneos()
    .subscribe((resp:any)=>
    {
      this.torneos=resp.torneos;
      console.log(this.torneos);
    }); 
  }
  obtenerTorneosPaginados()
  {
    this._torneosService.obtenerTorneosPaginados(this.desde)
    .subscribe((resp:any)=>
    {
      this.totalRegistro=resp.total;
      this.torneos=resp.torneos;
      console.log(this.torneos);
    }); 
  }
  cambiarDesde(valor:number)
  {
    let desde= this.desde + valor;
    console.log(desde);
    if (desde>=this.totalRegistro)
    {
      return;
    }
    if (desde< 0)
    {
      return;
    }
    this.desde +=valor;
    this.obtenerTorneosPaginados();
  }
  crearTorneo()
  {
    Swal.fire({
      title: 'Ingresa el nombre de la Liga',
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debes de escribir el nombre del Torneo'
        }
        else{
          this._torneosService.crearEquipo(value)
          .subscribe((resp:any)=>
          {
            this.obtenerTorneosPaginados();
            Swal.fire('Torneo Creado', 'El Torneo se ha Creado Correctamente', 'success');
          });
        }
      }
    })
  }
  guardarTorneo(torneo:Torneo)
  {
    this._torneosService.actualizarTorneo(torneo)
    .subscribe(()=>
    {
      this.obtenerTorneosPaginados();
      Swal.fire('Torneo Actualizado', 'El Torneo se ha Actualizado Correctamente', 'success');
    });
  }
  borrarTorneo(torneo:Torneo)
  {
    this._torneosService.eliminarTorneo(torneo._id)
    .subscribe((resp:any)=>
    {
      this.obtenerTorneosPaginados();
      Swal.fire('Torneo Eliminado', 'El Torneo se ha Eliminado Correctamente', 'success');
    });
  }
  buscarEquipo(termino:string)
  {
    if (termino.length<=0)
    {
      this.obtenerTorneosPaginados();
      return;
    }
    //this.cargando=true;
    this._torneosService.buscarTorneo(termino)
    .subscribe((torneos: Torneo[]) => {
      this.torneos=torneos;
      //this.cargando=false;
    });
  }
  ngOnDestroy(){

  }
}
