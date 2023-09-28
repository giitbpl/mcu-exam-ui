import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ProgressserviceService {

  constructor(private dialog: MatDialog) { }
  private dialogref:any;
  show()
  {
    
  }
}
