import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { LayoutComponent } from './shared/components/Layout/Layout.component';
import { AddComponent } from './shared/components/add/add.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViewsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
