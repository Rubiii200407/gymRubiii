import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClasesOnline } from '../clases-online.model';

@Component({
  selector: 'jhi-clases-online-detail',
  templateUrl: './clases-online-detail.component.html',
})
export class ClasesOnlineDetailComponent implements OnInit {
  clasesOnline: IClasesOnline | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clasesOnline }) => {
      this.clasesOnline = clasesOnline;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
