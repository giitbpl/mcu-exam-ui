import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { ImportService } from 'src/app/services/import.service';
import { SearchService } from 'src/app/services/search.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  tables: any;
  myform = this.formBuilder.group({
    envno: new FormControl('', Validators.required),
    // roll: new FormControl('', Validators.required),
    coursecode: new FormControl('', Validators.required),
    // session_name: new FormControl('', Validators.required),
  });
  public dtOptions: DataTables.Settings = {};
  userlist: any;
  loaddata: any = false;
  // lists = ["indore", "bhopal", "vidisha", "sehore"]
  courselist: any;
  sessionlist: any;
  showsessioname: boolean = false;
  // send to trs component
  detail: any;
  constructor(private snackBar: ToastService, private courseserice: CourseService, private importService: ImportService, private formBuilder: FormBuilder, private searchservice: SearchService) {
    courseserice.getAllCourse().subscribe((data: any) => {
      console.log(data);
      
      this.courselist = data.data;
    });
    importService.getAllTables().subscribe((data: any) => {
      console.log("table name=>", data);
      // if(data.error=="false") {
      this.tables = data.data;
      //  }
      //  else
      //  {
      // location.href="/";
      //  }
    });
  }
  process(session_name: string) {
    console.log(this.myform.valid);
    let processData = {
      "session_name": session_name,
      "coursecode": this.myform.controls.coursecode.value,
      "envno": this.myform.controls.envno.value
    };
    // console.log(processData);

    this.searchservice.search(processData).subscribe((data: any) => {
      if (data.error == "false") {
        // console.log(data);
        this.userlist = data.data;
        this.loaddata = true;
        this.detail=data.data;
      }
      else {
        this.snackBar.open(data.message, "error");
        this.loaddata = false;
      }
    });
  }
  selectionChanged(event: any) {

  }
  loadSession() {
    // this.myform.controls.session_name.clearValidators();

    console.log(this.myform.valid);

    if (this.myform.valid == true) {
      this.searchservice.getSessionListByEnrollment(this.myform.value).subscribe((data: any) => {
        console.log(data);
        if (data.error == "false") {
          this.sessionlist = data.data;
          this.showsessioname = true;

        }
        else {
          this.snackBar.open(data.message, "error");
          this.showsessioname = false;

        }
      });
    }
    else {

    }
    // if(this.myform.value)
  }
  onChange(event: any) {
    console.log(event.text);

  }
}
