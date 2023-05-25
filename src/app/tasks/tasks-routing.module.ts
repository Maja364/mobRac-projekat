import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksPage } from './tasks.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TasksPage,
    children: [
      {
        path: 'explore',
        loadChildren: () => import('./explore/explore.module').then(m => m.ExplorePageModule)
      },
      {
        path: 'saved',
        loadChildren: () => import('./saved/saved.module').then(m => m.SavedPageModule)
      },
      {
        path: '',
        redirectTo: '/tasks/tabs/explore',
        pathMatch: 'full'
      },
    ]
  },

  {
    path: '',
    redirectTo: '/tasks/tabs/explore',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksPageRoutingModule { }
