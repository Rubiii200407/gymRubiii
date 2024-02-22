import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeportes } from '../deportes.model';

@Component({
  selector: 'jhi-deportes-detail',
  templateUrl: './deportes-detail.component.html',
})
export class DeportesDetailComponent implements OnInit {
  deportes: IDeportes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deportes }) => {
      this.deportes = deportes;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
