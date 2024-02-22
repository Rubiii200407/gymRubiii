import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIncripciones } from '../incripciones.model';

@Component({
  selector: 'jhi-incripciones-detail',
  templateUrl: './incripciones-detail.component.html',
})
export class IncripcionesDetailComponent implements OnInit {
  incripciones: IIncripciones | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ incripciones }) => {
      this.incripciones = incripciones;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
