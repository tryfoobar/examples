import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooComponent } from './foo/foo.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'foo', component: FooComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
