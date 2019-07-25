import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
declare var swal:any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde:number=0;
  totalRegistro:number=0;
  cargando:boolean=true;
  constructor(public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(resp=> this.cargarUsuarios());
  }

  cargarUsuarios()
  {
    this.cargando=true;
    this._usuarioService.cargarUsuarios(this.desde)
    .subscribe((resp:any)=>{
        console.log(resp);
        this.totalRegistro = resp.total;
        this.usuarios= resp.usuarios;
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
    this.cargarUsuarios();
  }
  buscarUsuario(termino:string)
  {
    if (termino.length<=0)
    {
      this.cargarUsuarios();
      return;
    }
    this.cargando=true;
    this._usuarioService.buscarUsuarios(termino)
    .subscribe((usuarios: Usuario[]) => {
      this.usuarios=usuarios;
      this.cargando=false;
    });
  }
  borrarUsuario(usuario:Usuario)
  {
    console.log(usuario);
    if (usuario._id===this._usuarioService.usuario._id)
    {
      Swal.fire ('Error','No se puede Borrar asi mismo','error');
    }
    else{
      Swal.fire({
        title: '¿Estas Seguro?',
        text: "Esta a punto de Eliminar a "+ usuario.nombre,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Quiero Eliminarlo!',
        cancelButtonText: 'Cancelar'
        }).then((result) => {
        if (result.value) {
          this._usuarioService.borrarUsuarios(usuario._id)
          .subscribe(borrado=>
            {
              console.log(borrado);
              this.cargarUsuarios();
            })
        }
      })
    }
  }
  guardarUsuario(usuario:Usuario)
  {
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }
  mostrarModal(id:string)
  {
    this._modalUploadService.mostrarModal('usuarios',id);
  }

}


