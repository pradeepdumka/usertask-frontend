import { Component, ViewEncapsulation } from '@angular/core';

import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserModelComponent } from './popup-model/user-model/user-model.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  constructor(private dialog: MatDialog){

  }

  title = 'task-management';
  onCreateUser(){
    const dilogConfig = new MatDialogConfig();
    dilogConfig.disableClose=false;
    dilogConfig.autoFocus=true;
    dilogConfig.width="60%"
    const dialogRef = this.dialog.open(UserModelComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        //this.dialogValue = result.data;
       
      });
  }
 
}
