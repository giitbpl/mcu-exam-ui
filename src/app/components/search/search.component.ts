import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ImportService } from 'src/app/services/import.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  tables: any;
  myform = this.formBuilder.group({
    envno:new FormControl('', Validators.required),
    roll:new FormControl('', Validators.required),
    tablename: new FormControl('', Validators.required)
  });
  public dtOptions: DataTables.Settings = {};
  userlist:any;
  loaddata:any=false;
  constructor(private importService:ImportService,private formBuilder: FormBuilder,private searchservice:SearchService)
  {
    importService.getAllTables().subscribe((data:any) =>{
      console.log("table name=>",data);
     // if(data.error=="false") {
      this.tables=data.data;
    //  }
    //  else
    //  {
        // location.href="/";
    //  }
    });
  }
  process()
  {
      console.log(this.myform.value);
      this.searchservice.search(this.myform.value).subscribe((data:any) =>{
        console.log(data);
        this.userlist=data.data;
        this.loaddata=true;
      });  
  }
}
