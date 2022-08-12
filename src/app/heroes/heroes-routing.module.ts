import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AggregateComponent } from './pages/aggregate/aggregate.component';
import { HeroComponent } from './pages/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  {
      path: '',
      component: HomeComponent,
      children: [
        {
          path: 'list',
          component: ListComponent
        },
        {
          path: 'aggregate',
          component: AggregateComponent
        },
        {
          path: 'edit/:id',
          component: AggregateComponent
        },
        {
          path: 'search',
          component: SearchComponent
        },
        {
          path: ':id',
          component: HeroComponent
        },
        {
          path: '**',
          redirectTo: 'list'
        }
      ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule { }
