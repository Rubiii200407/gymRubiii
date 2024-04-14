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
        path: 'plan-nutricion-entrenamiento',
        data: { pageTitle: 'gymRubenApp.planNutricionEntrenamiento.home.title' },
        loadChildren: () => import('./plan-nutricion-entrenamiento/plan-nutricion-entrenamiento.module').then(m => m.PlanNutricionEntrenamientoModule),
      },
      {
        path: 'videos-plan-entrenamiento',
        data: { pageTitle: 'gymRubenApp.videosPlanEntrenamiento.home.title' },
        loadChildren: () =>
          import('./videos-plan-entrenamiento/videos-plan-entrenamiento.module').then(m => m.VideosPlanEntrenamientoModule),
      },
      {
        path: 'comentario',
        data: { pageTitle: 'gymRubenApp.comentario.home.title' },
        loadChildren: () =>
          import('./comentario/comentario.module').then(m => m.ComentarioModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
