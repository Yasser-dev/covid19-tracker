import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { CountUpModule } from 'ngx-countup';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { RoutingModule } from './routing/routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { CountriesComponent } from './countries/countries.component';
import { DataService } from './services/data.service';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    CountriesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RoutingModule,
    HttpClientModule,
    ChartsModule,
    CountUpModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
