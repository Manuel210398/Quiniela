import { Component, OnInit } from '@angular/core';
import { Estadio } from 'src/models/estadio.model';
import Swal from 'sweetalert2';
import { EstadioService } from 'src/app/services/estadios/estadio.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-estadios',
  templateUrl: './estadios.component.html',
  styles: []
})
export class EstadiosComponent implements OnInit {

  estadios:Estadio[]=[];
  desde:number=0;
  totalRegistro:number=0;
  cargando:boolean=true;
  constructor(public _estadioService: EstadioService,public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarEstadios();
    this._modalUploadService.notificacion.subscribe(()=>
    {
      this.cargarEstadios();
    });
  }
  crearEstadio()
  {
    Swal.fire({
      title: 'Crear Estadio',
      input: 'text',
      html:"Ingrese el nombre del Estadio", 
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) 
        {
          return 'You need to write something!'
        }
        this._estadioService.crearEstadio(value)
        .subscribe(()=>this.cargarEstadios());
      }
    })
  }
  cargarEstadios()
  { 
    this.cargando=true;
    this._estadioService.cargarEstadios(this.desde)
    .subscribe((resp:any)=>
    {
      console.log(resp);
      this.totalRegistro=resp.total;
      this.estadios= resp.estadios;
      this.cargando=false;
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
    this.cargarEstadios();
  }
  buscarEstadios(termino:string)
  {
    if (termino.length<=0)
    {
      this.cargarEstadios();
      return;
    }
    this.cargando=true;
    this._estadioService.buscarEstadios(termino)
    .subscribe((estadios: Estadio[]) => {
      this.estadios=estadios;
      this.cargando=false;
    });
  }
  guardarEstadio(estadio:Estadio)
  {
    this._estadioService.actualizarEstadio(estadio)
    .subscribe(()=>this.cargarEstadios());
  }
  eliminarEstadio(estadio:Estadio)
  {
    this._estadioService.borrarEstadio(estadio._id)
    .subscribe(()=>this.cargarEstadios());
  }
  actualizarImagen(estadio:Estadio)
  {
    this._modalUploadService.mostrarModal('estadios',estadio._id);
    this.cargarEstadios();
  }
}
