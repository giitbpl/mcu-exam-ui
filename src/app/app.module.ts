import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
// import { LogTableComponent } from './components/log-table/log-table.component';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { AppconfigService } from './services/appconfig.service';
import { BackupComponent } from './components/backup/backup.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { RestoreComponent } from './components/restore/restore.component';
// import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

// import { NgModule, APP_INITIALIZER } from '@angular/core';
export function initConfig(appConfig: AppconfigService) {
  return () => appConfig.loadConfig();
}
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
    ChangePwdComponent,
    BackupComponent,
    AboutusComponent,
    RestoreComponent,
    // LogTableComponent
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
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    // ProgressBarMode,
    MatProgressBarModule,
    MatTabsModule,
    MatSlideToggleModule,
    // FormModule
    BackButtonDisableModule.forRoot({
      preserveScroll: false,
      
    })

  ],
  providers: [
    UpperCasePipe,
    DatePipe,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptorInterceptor, multi:true},
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppconfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
