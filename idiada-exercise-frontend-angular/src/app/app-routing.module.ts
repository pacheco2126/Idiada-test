import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesListComponent } from './view/vehicles-list/vehicles-list.component';
import { AddComponent } from './Vehicle/add/add.component';
import { EditComponent } from './Vehicle/edit/edit.component';

const routes: Routes = [
  { path: '', component: VehiclesListComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
