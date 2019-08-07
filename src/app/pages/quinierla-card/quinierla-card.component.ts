import {Component, Input, OnInit} from '@angular/core';
import { PartidoService } from 'src/app/services/partidos/partido.service';
import {Partido} from '../../../models/partidos.model';

@Component({
  selector: 'app-quinierla-card',
  templateUrl: './quinierla-card.component.html',
  styles: []
})
export class QuinierlaCardComponent implements OnInit {

  @Input() partido: Partido;
  @Input() indice: number;

  constructor(public _partidoService: PartidoService) { }

  ngOnInit() {
  }
  
}
