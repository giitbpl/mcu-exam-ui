import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { ImportService } from 'src/app/services/import.service';
import { SearchService } from 'src/app/services/search.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  courselist: any;
  constructor(private snackBar: ToastService, private courseserice: CourseService, private importService: ImportService, private formBuilder: FormBuilder, private searchservice: SearchService) {
    courseserice.getAllCourse().subscribe((data: any) => {
      console.log(data);

      this.courselist = data.data;
    });
  }



  onChange(arg0: EventTarget | null) {
    // throw new Error('Method not implemented.');
  }
  create(coursecode: any) {
    console.log(coursecode);
    this.courseserice.createCourseTable(coursecode).subscribe((data:any) => {
      if(data.error=="true")
      {
        this.snackBar.open(data.message,"success");

      }
      else
      {
        this.snackBar.open(data.message,"error");

      }
    });
    // throw new Error('Method not implemented.');
    // coursecode = null;
  }

}
