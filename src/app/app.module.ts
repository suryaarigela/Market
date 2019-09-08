import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';
import { DataServiceService } from './Services/data-service.service';
import { AppServiceService } from './Services/app-service.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {
  MatTableModule, MatPaginatorModule, MatSortModule, MatSelectModule, MatCheckboxModule, MatCardModule, MatSnackBarModule, MatInputModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DataVisualizationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    MatTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule,
    MatInputModule,
  ],
  providers: [DataServiceService, AppServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
