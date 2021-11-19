import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasManagementServices } from 'src/app/services/task-management.services';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  dataRef:any
  userName!:string
  constructor(
    private taskManagement:TasManagementServices,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
      this.dataRef= data;
      this.userName=data.userName
  }

  ngOnInit(): void {
    
  }
  onOkClick(){
  
      let params = {id:this.dataRef.id} 
      //console.log(params)
      this.taskManagement.deleteUserWithTaskDetails(params).subscribe((res=>{
          //console.log(res);
          this.dialogRef.close(res);
      }))
  }
}
