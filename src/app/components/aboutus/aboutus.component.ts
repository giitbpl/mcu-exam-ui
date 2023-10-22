import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
// const version = require('project-version');

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
public title: string;
public version: string;
public year=new Date().getFullYear(); 
constructor()
{
  this.version=environment.version;
  this.title=environment.appTitle;
}
}
