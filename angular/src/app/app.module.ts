import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { FooComponent } from './foo/foo.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { crudReducer } from './crud/crud.reducer';
import { CrudComponent } from './crud/crud.component';

@NgModule({
  declarations: [AppComponent, FooComponent, HomeComponent, CrudComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ crud: crudReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
