import { Component, OnInit } from '@angular/core';
import { EquiposService } from 'src/app/services/equipos/equipos.service';
import { Equipo } from 'src/models/equipo.model';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { EstadioService } from 'src/app/services/estadios/estadio.service';
import { Estadio } from 'src/models/estadio.model';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styles: []
})
export class EquiposComponent implements OnInit {
  aux:string;
  equipos:Equipo[]=[];
  estadios:Estadio[]=[];
  desde:number=0;
  totalRegistro:number=0;
  cargando:boolean=true;
  constructor(public _equipoService:EquiposService
    , public _modalUploadService: ModalUploadService,public _estadiosService:EstadioService) { }

  ngOnInit() {
    this.cargarEquipos();
    this.cargarEstadios();
    this._modalUploadService.notificacion.subscribe(()=>
    {
      this.cargarEquipos();
    });
  }
  cargarEstadios()
  {
    this._estadiosService.cargarTodosEstadios()
    .subscribe((resp:any)=>
    {
      console.log(resp);
      this.estadios=resp.estadios;
    });
  }
  cargarTodosEquipos()
  {
    this._equipoService.cargarTodosEquipos()
    .subscribe((resp:any)=>
    {
      this.equipos=resp.equipos;
    }); 
  }
  cargarEquipos()
  { 
    this.cargando=true;
    this._equipoService.cargarEquipos(this.desde)
    .subscribe((resp:any)=>
    {
      console.log(resp);
      this.totalRegistro=resp.total;
      this.equipos= resp.equipos;
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
    this.cargarEquipos();
  }
  guardarEquipo(equipo:Equipo)
  {
    this._equipoService.actualizarEquipo(equipo)
    .subscribe(()=>this.cargarEquipos());
  }
  eliminarEquipo(equipo:Equipo)
  {
    this._equipoService.borrarEquipo(equipo._id)
    .subscribe(()=>this.cargarEquipos());
  }
  buscarEquipo(termino:string)
  {
    if (termino.length<=0)
    {
      this.cargarEquipos();
      return;
    }
    this.cargando=true;
    this._equipoService.buscarEquipo(termino)
    .subscribe((equipos: Equipo[]) => {
      this.equipos=equipos;
      this.cargando=false;
    });
  }
   crearEquipo()
  {
    let nombre:string='';
    let alias:string='';
    Swal.fire(
      {title: "Crear Nuevo Equipo",
      animation: true,
      customClass:'bounceInDown',
      showCancelButton: true,
      confirmButtonText:"Confirmar",
      html:"<form  ngNativeValidate id='formValidate' class='formValidate'>"+
              "Nombre:   "+
              "<input id='resolution' name='resolution'   type='text'   class='form_input'  required  minlenght='2'  placeholder='' required  style='width: 80%; padding: 12px 20px;margin: 8px 0;border: 1px solid #ccc;border-radius: 4px;box-sizing: border-box; '/>" +"</br>" +
              "Alias:   "+
              "<input id='date'         name='date'         type='text'   class='form_input'  required  placeholder='' required style='width: 38%;   height=40%; padding: 12px 20px;margin: 8px 0;border: 1px solid #ccc;border-radius: 4px;box-sizing: border-box; ' />" + "&nbsp&nbsp&nbsp&nbsp" +
              "</form>",
          preConfirm: () => {
            nombre = (<HTMLInputElement>document.getElementById('resolution')).value;
            alias = (<HTMLInputElement>document.getElementById('date')).value;
            return [ nombre , alias]
          }

      }).then(()=>
      {
        if (!nombre || !alias)
        {
          return; 
        }
        this._equipoService.crearEquipo(nombre , alias)
        .subscribe(()=> this.cargarEquipos());
      })
    
  }
  actualizarImagen(equipo:Equipo)
  {
    this._modalUploadService.mostrarModal('equipos',equipo._id);
    this.cargarEquipos();
  }
}
 