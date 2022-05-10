import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FopComponent } from './fop/fop.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fop', component: FopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
