import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
    message :string="success";
    cssclass :string;
    constructor(@Inject(MAT_DIALOG_DATA) private data: any)
    {
      if(data!=null)
        {
          console.log(data);
          
          this.message=data.message;
          // if(data.type=="success")
          this.cssclass=data.cssclass+" bg-gradient text-white";
        }
    }
}
