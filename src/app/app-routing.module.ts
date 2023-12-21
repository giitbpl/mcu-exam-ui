import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ImportComponent } from './components/import/import.component';
import { LogsComponent } from './components/logs/logs.component';
import { ChangePwdComponent } from './components/change-pwd/change-pwd.component';
import { BackupComponent } from './components/backup/backup.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { RestoreComponent } from './components/restore/restore.component';
import { SearchComponent } from './components/search/search.component';
import { TrsComponent } from './components/trs/trs.component';
import { ToolsComponent } from './components/tools/tools.component';
import { ImportDashboardComponent } from './components/import-dashboard/import-dashboard.component';
import { CollegeMasterComponent } from './components/college-master/college-master.component';
import { CourseComponent } from './components/course/course.component';
import { SubjectComponent } from './components/subject/subject.component';
import { TrcsemisterComponent } from './components/trcsemister/trcsemister.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', component: SearchComponent },
      {path: 'trcsem', component: TrcsemisterComponent },
      { path: 'user', component: UsersComponent },
      {
        path: 'import', component: ImportDashboardComponent, children: [
       
        ]
      },
      { path: '', component: CollegeMasterComponent },
      { path: 'importdata', component: ImportComponent },
      { path: 'college-master', component: CollegeMasterComponent },
      { path: 'course', component: CourseComponent },
      { path: 'subject', component: SubjectComponent },
      { path: 'logs', component: LogsComponent },
      { path: 'chpwd', component: ChangePwdComponent },
      { path: 'backup', component: BackupComponent },
      { path: 'about', component: AboutusComponent },
      { path: 'restore', component: RestoreComponent },
      { path: 'search', component: SearchComponent },
      { path: 'tools', component: ToolsComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
