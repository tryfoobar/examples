import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FopComponent } from './fop/fop.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, FopComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
