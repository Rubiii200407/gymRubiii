import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'clases-online',
        data: { pageTitle: 'gymRubenApp.clasesOnline.home.title' },
        loadChildren: () => import('./clases-online/clases-online.module').then(m => m.ClasesOnlineModule),
      },
      {
        path: 'deportes',
        data: { pageTitle: 'gymRubenApp.deportes.home.title' },
        loadChildren: () => import('./deportes/deportes.module').then(m => m.DeportesModule),
      },
    
  
      

      {
        path: 'planes-entrenamiento',
        data: { pageTitle: 'gymRubenApp.planesEntrenamiento.home.title' },
        loadChildren: () => import('./planes-entrenamiento/planes-entrenamiento.module').then(m => m.PlanesEntrenamientoModule),
      },
      {
        path: 'planes-nutricion',
        data: { pageTitle: 'gymRubenApp.planesNutricion.home.title' },
        loadChildren: () => import('./planes-nutricion/planes-nutricion.module').then(m => m.PlanesNutricionModule),
      },
      {
        path: 'videos-clase-online',
        data: { pageTitle: 'gymRubenApp.videosClaseOnline.home.title' },
        loadChildren: () => import('./videos-clase-online/videos-clase-online.module').then(m => m.VideosClaseOnlineModule),
      },
      {
        path: 'videos-plan-entrenamiento',
        data: { pageTitle: 'gymRubenApp.videosPlanEntrenamiento.home.title' },
        loadChildren: () =>
          import('./videos-plan-entrenamiento/videos-plan-entrenamiento.module').then(m => m.VideosPlanEntrenamientoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
