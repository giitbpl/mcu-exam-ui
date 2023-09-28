import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'dashboard', component:DashboardComponent,children: [
    { path: 'user', component:UsersComponent},
    { path: 'export', component:UploadComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
