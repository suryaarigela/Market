import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';

const routes: Routes = [
  { path: '', component: DataVisualizationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
