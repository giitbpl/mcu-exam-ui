import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { ImportService } from 'src/app/services/import.service';
import { SearchService } from 'src/app/services/search.service';
import { SharingeDataService } from 'src/app/services/sharinge-data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-trcsemister',
  templateUrl: './trcsemister.component.html',
  styleUrls: ['./trcsemister.component.css']
})
export class TrcsemisterComponent {
  
  constructor(private sharing: SharingeDataService, private snackBar: ToastService, private courseserice: CourseService, private importService: ImportService, private formBuilder: FormBuilder, private searchservice: SearchService) {
    this.courseserice.getCourseNameByType("P").subscribe((data: any) => {
      console.log("code=>", data.data[0].code);
      this.courselist = data.data;
      //  this.lastsem = this.courselist[0].max_sem.substring(0, 1);
      //  this.sems = this.range(this.lastsem);
      console.log(this.sems);

      this.myform.patchValue({
        coursecode: data.data[0].code
      });
    });
  }
  reload() {
    window.location.reload()
  }
  loadCourse(coursetype: any) {
    this.courseserice.getCourseNameByType(coursetype).subscribe((data: any) => {
      console.log(data);
      this.courselist = data.data;
    });
    // throw new Error('Method not implemented.');
  }
  // getSelectedIndex($event: Event) {
  //   throw new Error('Method not implemented.');
  // }

  loaddata: boolean;
  // sessionlist: any;
  myform = this.formBuilder.group({
    envno: new FormControl('', Validators.required),
    // roll: new FormControl('', Validators.required),
    coursecode: new FormControl('', Validators.required),
    // sem: new FormControl('1', Validators.required),
    // session_name: new FormControl('', Validators.required),
  });
  courselist: any;
  sems: any;
  showsessioname: any;
  process() {
    // throw new Error('Method not implemented.');
    console.log(this.myform.controls["coursecode"].value);
    this.searchservice.searchByCourseAndEnrollment(this.myform.value).subscribe((response: any) => {
      // console.log(response);
      // this.courseserice.
      if (response.error == "false") {
        this.courseserice.getCourseByCode(this.myform.controls["coursecode"].value).subscribe((data: any) => {
          // console.log("Course:",data.data);
          let result = response.data.reduce((r: { name: string, semdetail: any[] }[], { yrtermcode: name, ...object }: { yrtermcode: string }) => {
            var temp = r.find(o => o.name === name);
            if (!temp) r.push(temp = { name, semdetail: [] });
            temp.semdetail.push(object);
            return r;
          }, []);


          console.log("process result=>", result[0].name);

          let detail = {
            "course": data.data[0].fullname,
            "shortname": data.data[0].shortname,

            "studentail": result,
          };
          // response.data
          // console.log("course code: =" , detail);
          this.sharing.changeMessage(detail);
          this.loaddata = true;
        });

      }
      else {
        this.loaddata = false;
        this.snackBar.open(response.message, "error");
      }

    });
  }

}
