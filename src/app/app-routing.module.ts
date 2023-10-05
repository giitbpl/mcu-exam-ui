import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ImportComponent } from './components/import/import.component';
import { LogsComponent } from './components/logs/logs.component';

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'dashboard', component:DashboardComponent,children: [
    { path: 'user', component:UsersComponent},
    { path: 'import', component:ImportComponent},
    { path: 'logs', component:LogsComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
