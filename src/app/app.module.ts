import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { UsersComponent } from './components/users/users.component';
import { LogsComponent } from './components/logs/logs.component';
import { DataTablesModule } from 'angular-datatables';
// import { DataTablesModule } from "angular-datatables";
import {MatDialogModule} from '@angular/material/dialog';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ImportComponent } from './components/import/import.component';
import {ProgressBarMode, MatProgressBarModule} from '@angular/material/progress-bar';
import { ProgressdialogComponent } from './components/progressdialog/progressdialog.component';
import { AppInterceptorInterceptor } from './app-interceptor.interceptor';
import { ImportdialogComponent } from './components/importdialog/importdialog.component';
// import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import { ChangePwdComponent } from './components/change-pwd/change-pwd.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    LogsComponent,
    AddUserComponent,
    ImportComponent,
    ProgressdialogComponent,
    ImportdialogComponent,
    ChangePwdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    DataTablesModule,
    MatDialogModule,
    // ProgressBarMode,
    MatProgressBarModule,
    MatTabsModule,
    // FormModule
    BackButtonDisableModule.forRoot({
      preserveScroll: false,
      
    })

  ],
  providers: [

    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptorInterceptor, multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
