import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { ImportService } from 'src/app/services/import.service';
import { SearchService } from 'src/app/services/search.service';
import { SharingeDataService } from 'src/app/services/sharinge-data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  studetail: any = [];
  name: string;
  username: string;
  ipaddress: string;
  email: string;
  lastsem: any;
  sems: any;
  consolidateddata: any;
  loadCourse(coursetype: any) {
    this.courseserice.getCourseNameByType(coursetype).subscribe((data: any) => {
      // console.log(data);
      this.courselist = data.data;
    });
    // throw new Error('Method not implemented.');
  }
  // selectedcoursetext: string = ""
  getSelectedIndex(event: any) {

    // console.log(event.target['options'].selectedIndex);
    let index = event.target['options'].selectedIndex;
    // console.log(this.courselist[index].max_sem);
    this.lastsem = this.courselist[index].max_sem.substring(0, 1);
    this.sems = this.range(this.lastsem);
    // console.log(this.sems);

    // [event.target['options'].selectedIndex].text);
    // this.selectedcoursetext=event.target['options'][event.target['options'].selectedIndex].text;

    // console.log(event.target.getAttribute('data-index'));

  }
  tables: any;
  myform = this.formBuilder.group({
    envno: new FormControl('', Validators.required),
    // roll: new FormControl('', Validators.required),
    coursecode: new FormControl('', Validators.required),
    sem: new FormControl('1', Validators.required),
    // session_name: new FormControl('', Validators.required),
  });
  public dtOptions: DataTables.Settings = {};
  userlist: any;
  loaddata: any = false;
  // lists = ["indore", "bhopal", "vidisha", "sehore"]
  courselist: any;
  sessionlist: any;
  showsessioname: boolean = false;
  filteredOptions: Observable<any[]>;

  // send to trs component
  detail: any;
  constructor(private sharing: SharingeDataService, private snackBar: ToastService, private courseserice: CourseService, private importService: ImportService, private formBuilder: FormBuilder, private searchservice: SearchService) {


    this.courseserice.getCourseNameByType("P").subscribe((data: any) => {
      // console.log("code=>", data.data[0].code);
      this.courselist = data.data;
      this.lastsem = this.courselist[0].max_sem.substring(0, 1);
      this.sems = this.range(this.lastsem);
      // console.log(this.sems);

      this.myform.patchValue({
        coursecode: data.data[0].code
      });
    });

  }
  process(session_name: string) {
    // console.log(this.myform.valid);
    let processData = {
      "session_name": session_name,
      "coursecode": this.myform.controls.coursecode.value,
      "envno": this.myform.controls.envno.value,
      "sem": this.myform.controls.sem.value
    };
    console.log("processdata=>",processData);

    this.searchservice.search(processData).subscribe((data: any) => {
      console.log("search: ", data);

      if (data.error == "false") {

        // this.userlist = data.data;

        // console.log(data.data[0].stdcent);
        this.searchservice.getStudieCenterDetailByCode(data.data[0].stdcent, session_name).subscribe((response: any) => {

          // this.detail["study"]=response.data;
          // this.detail["data"]=data.data;
          // data.data.
          // console.log("result data=>",data);
          let subcode: any = [];
          data.data.forEach((element: any) => {
            // console.log(element.subcode);
            subcode.push(element.subcode);
          });
          let s = new Set(subcode);
          let it = s.values();
          subcode=Array.from(it);
          subcode=subcode.join(",");
          console.log("subcode=>", subcode);
          this.searchservice.getSubjectsDetailByCodeList(subcode).subscribe((subject: any) => {
            console.log("subject length=", subject.data);
            console.log("data length=",data.data.length);
            data.data[0].examname = subject.data[0].EXAM_NAME;
            for (let i = 0; i < data.data.length; i++) {
              subject.data.forEach((element: any) => {
                if (data.data[i].subcode == element.SUBJE) {
                  data.data[i].subname = element.SUBJECT_NAME;
                
                  data.data[i].tmax = element.THEORY_MAX_MARKS;
                  data.data[i].tmin = element.THEORY_MIN_MARKS;
                  data.data[i].pmax = element.PRACTICAL_MAX_MARKS;
                  data.data[i].pmin = element.PRACTICAL_MIN_MARKS;
                  // data.data[i].pmin = element.PRACTICAL_MIN_MARKS;
                  data.data[i].smax = element.SESSIONAL_MAX_MARKS;
                  data.data[i].smin = element.SESSIONAL_MIN_MARKS;
                  // data.data[i].thobt = element.THOBT;

                  return;
                }
              });

            }
            console.log("update data=>", data);

           
          });
     //     if (this.myform.controls.sem.value == this.lastsem) {
            // console.log("lastsem");
            this.searchservice.getConsolidateResults(processData).subscribe((res: any) => {
              console.log("consolidate response=>",res);
              if (res.error == "false") {
                // this.consolidateddata=res.data;
                this.detail = {
                  "study": response.data,
                  "student": data.data,
                  "consolidateddata": res.data,
                  "sem":processData.sem
                  // "subject":subject.data
                };
                // console.log("detail:", this.detail);
                this.studetail = this.detail;
                this.sharing.changeMessage(this.detail);
                this.loaddata = true;
              }
              else
              {
                this.snackBar.open(data.message, "error");
              }
            });

      //    }
      //    else
        //  {
            // // this.detail = {
            // //   "study": response.data,
            // //   "student": data.data,
            // //   "consolidateddata":[]
            // //   // "subject":subject.data
            // // };
            // console.log("detail:", this.detail);
            // this.studetail = this.detail;
            // this.sharing.changeMessage(this.detail);
            // this.loaddata = true;
        //  }

        });

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
    // console.log("loadSession");

    this.loaddata = false;
    // console.log(this.myform.value);

    if (this.myform.valid == true) {
      
      this.searchservice.getSessionListByEnrollment(this.myform.value).subscribe((data: any) => {
        // console.log(data);
        if (data.error == "false") {
          this.sessionlist = data.data;
          this.showsessioname = true;

        }
        else {
          // if(err``)
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
    // console.log(event.text);

  }
  displayFn(user: any): string {
    return user && user.code ? user.code : '';
  }
  // range1(i: number) { var x = []; var i = 0; while (x.push(i++) < i) { }; return x }
  range(max: number) {
    let range = [];
    for (var i = 0; i < max; i++) {
      range.push(i);
    }
    return range;
  }
  reload()
  {
    location.reload();
  }
}


