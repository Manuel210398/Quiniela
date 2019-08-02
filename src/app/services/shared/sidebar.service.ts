import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu:
        [
          {titulo: 'Dashboard', url: '/dashboard'}
        ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: '/usuarios'},
        {titulo: 'Partidos', url: '/partidos'},
        {titulo: 'Equipos', url: '/equipos'},
        {titulo: 'Estadios', url: '/estadios'},
        {titulo: 'Jornadas', url: '/jornadas'},
        {titulo: 'Resultados', url: '/quiniela'}
      ]
    },
    {
      titulo: 'Quiniela',
      icono: 'mdi mdi-scale',
      submenu: [
        {titulo: 'Quiniela', url: '/quiniela'},
        {titulo: 'Resultados', url: '/resultados'},

      ]
    }
  ];

  constructor() {
  }
}
