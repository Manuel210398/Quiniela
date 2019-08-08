import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PartidoService} from 'src/app/services/partidos/partido.service';
import {Partido} from 'src/models/partidos.model';
import {Jornada} from 'src/models/jornada.model';
import {EquiposService} from 'src/app/services/equipos/equipos.service';
import {Equipo} from 'src/models/equipo.model';
import {Pronostico} from 'src/models/pronostico.model';
import {PronosticosService} from 'src/app/services/pronosticos/pronosticos.service';
import {Usuario} from 'src/models/usuario.model';
import {UsuarioService} from 'src/app/services/service.index';
import {
  SwiperComponent,
  SwiperConfigInterface,
  SwiperDirective,
  SwiperPaginationInterface,
  SwiperScrollbarInterface
} from 'ngx-swiper-wrapper';

declare const jQuery: any;
declare const $: any;


@Component({
  selector: 'app-quiniela',
  templateUrl: './quiniela.component.html',
  styleUrls: ['./quiniela.component.scss'],
})
export class QuinielaComponent implements OnInit, AfterViewInit, OnDestroy {

  index = 0;
  public show: boolean = true;

  public slides = [
    'First slide',
    'Second slide',
    'Third slide',
    'Fourth slide',
    'Fifth slide',
    'Sixth slide'
  ];

  public type: string = 'component';

  public disabled: boolean = false;
/*
  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };
  */
  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };
/*
  public config: SwiperConfigInterface =
    { "direction": "horizontal",
      "slidesPerView": 1,
      "keyboard": true,
      "mousewheel": true,
      "scrollbar": false,
      "navigation": false,
      "pagination": this.pagination
    }
*/
  public config: SwiperConfigInterface =
    {
      'direction': 'horizontal',
      'slidesPerView': 1,
      'keyboard': true,
      'mousewheel': true,
      'scrollbar': false,
      'navigation': false,
      'pagination': {'el': '.swiper-pagination', 'clickable': true, 'hideOnClick': false}
    };

  pronosticoLocal = 0;
  pronosticoVisitante = 0;

  //@ViewChild(SwiperComponent) componentRef: SwiperComponent;
  //@ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  constructor(public _partidoService: PartidoService,
              public _equipoService: EquiposService,
              public _pronosticoService: PronosticosService,
              public _usuarioService: UsuarioService) {
  }

  partidos: Partido[] = [];
  equipos: Equipo[] = [];
  jornadas: Jornada[] = [];
  pronostico: Pronostico = new Pronostico();
  partido: Partido = new Partido();

  ngOnInit() {
    this.cargarJornadas();
    this.obtenerEquipos();
  }

  cambioJornada(event) {
    console.log(event);
    this._partidoService.obtenerPartidoporJornada(event)
      .subscribe(((resp: any) => {
        this.pronostico = resp.partidos;
        this.partidos = resp.partidos;
        this.toggleOverlayControls();

        this.partido = resp.partidos[this.index];
        console.log(this.partidos);
        console.log(this.partido);
      }));
  }

  cargarJornadas() {
    this._partidoService.obtenerJornadas()
      .subscribe((resp: any) => {
        console.log(resp);
        this.jornadas = resp.jornadas;
        console.log(this.jornadas);
      });
  }

  obtenerEquipos() {
    this._equipoService.cargarTodosEquipos()
      .subscribe((resp: any) => {
        this.equipos = resp.equipos;
        console.log(this.equipos);
      });
  }

  GuardarMarcador(partido: Partido) {
    var pronostico = new Pronostico();

    console.log(partido._id);
    pronostico.partido = partido._id;
    pronostico.usuario = this._usuarioService.usuario._id;
    pronostico.puntosAnfitrion = partido.puntosAnfitrion;
    pronostico.puntosVisitante = partido.puntosVisitante;
    console.log(pronostico.puntosAnfitrion, pronostico.puntosVisitante);
    this._pronosticoService.actualizarPronostico(pronostico)
      .subscribe((resp: any) => {
        this.pronostico = resp;
        console.log(resp);
      });
  }

  ngAfterViewInit(): void {


  }


  ngOnDestroy(): void {
  }


  public toggleType() {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled() {
    this.disabled = !this.disabled;
  }

  public toggleDirection() {
    this.config.direction = (this.config.direction === 'horizontal') ? 'vertical' : 'horizontal';
  }

  public toggleSlidesPerView() {
    if (this.config.slidesPerView !== 1) {
      this.config.slidesPerView = 1;
    } else {
      this.config.slidesPerView = 2;
    }
  }

  public toggleOverlayControls() {
    /*if (this.config.navigation) {
      this.config.scrollbar = false;
      this.config.navigation = false;

      this.config.pagination = this.pagination;
    } else if (this.config.pagination) {
      this.config.navigation = false;
      this.config.pagination = false;

      this.config.scrollbar = this.scrollbar;
    } else {
      this.config.scrollbar = false;
      this.config.pagination = false;

      this.config.navigation = true;
    }*/
    this.config.navigation = false;
    this.config.pagination = false;

    this.config.scrollbar = this.scrollbar;
/*
    if (this.type === 'directive') {
      this.directiveRef.setIndex(0);
    } else {
      this.componentRef.directiveRef.setIndex(0);
    }*/
  }

  public toggleKeyboardControl() {
    this.config.keyboard = !this.config.keyboard;
  }

  public toggleMouseWheelControl() {
    this.config.mousewheel = !this.config.mousewheel;
  }

  public onIndexChange(index: number) {
    console.log('Swiper index: ', index);

    this.partido = this.partidos[index];
  }
}
