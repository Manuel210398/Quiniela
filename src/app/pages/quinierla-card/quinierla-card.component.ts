import { Component, OnInit } from '@angular/core';
import { PartidoService } from 'src/app/services/partidos/partido.service';

@Component({
  selector: 'app-quinierla-card',
  templateUrl: './quinierla-card.component.html',
  styles: []
})
export class QuinierlaCardComponent implements OnInit {

  constructor(public _partidoService: PartidoService) { }

  ngOnInit() {
  }
  
}
