import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private BaseUrl:any;

  constructor(private http:HttpClient,private appconfig: AppconfigService) {
    this.BaseUrl=appconfig.getConfig().serverIp;
  }
  getAllCourse()
  {
    return this.http.get(this.BaseUrl+"course/all");
  }
  createCourseTable(tableName:string)
  {
    return this.http.post(this.BaseUrl+"course/create",{
      "tablename":tableName
    });
    
  }
  getCourseNameByType(type:any)
  {
    return this.http.post(this.BaseUrl+"course/coursebytype",{
      "type":type
    });
  }
}
