import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { LogsService } from 'src/app/services/logs.service';
// import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit, AfterViewInit {
  dtOptions: any = {};
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  constructor(private logservice: LogsService, private pipeDatePipeInstance: DatePipe) {

  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,

      ajax: (dataTablesParameters: any, callback: any) => {
        this.logservice.getInfoLog().subscribe((resp: any) => {
          console.log(resp);
          
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: resp.data             // <-- see here
          });
        });

      },
      columns: [{
        title: 'User Name',
        data: 'name'
      }, {
        title: 'IP',
        data: 'ip'
      }, {
        title: 'URL',
        data: 'url',

      },
      {
        title: 'METHOD',
        data: 'method',
        render: function (data: any, type: any, full: any) {
          if (data == "GET") {
            return `<strong class='text-info'>${data}</strong>`;


          }
          else {
            return `<strong class='text-warning'>${data}</strong>`;
          }
        }
      },
      {
        title: 'STATUS',
        data: 'status',
        render: function (data: any, type: any, full: any) {
          if (data == "200") {
            return `<strong class='text-success'>${data}</strong>`;


          }
          else {
            return `<strong class='text-danger'>${data}</strong>`;
          }
        }
      },
      {
        title: 'DATE',
        data: 'timestamp',
        cellType: 'date',
        ngPipeInstance: this.pipeDatePipeInstance,
        // ngPipeArgs: ["dd-MMM-yyyy H:mm:ss a"]

      }

      ],
      dom: 'lfBrtip',

      buttons: [
        { text: "Excel", extends: 'excel', className: ' btn-primary' },

        // "excel",
        "print",
        "pdf"
        // 'columnsToggle',
        // 'colvis'
      ],
    };
  }
  ngAfterViewInit(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {

      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== $(this).val()) {
            that
              .search($(this).val() + "")
              .draw();
          }
        });
      });
    });
  }
}
