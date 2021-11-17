import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasManagementServices } from 'src/app/services/task-management.services';


@Component({
  selector: 'app-task-model',
  templateUrl: './task-model.component.html',
  styleUrls: ['./task-model.component.scss']
})
export class TaskModelComponent implements OnInit {
  tasks !: FormGroup
  userDetails: any;

  @ViewChild(TaskModelComponent) elRef !:TaskModelComponent
  constructor(
    private fb: FormBuilder,
    private taskManagement:TasManagementServices,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TaskModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 

      this.userDetails = data;
    }

  ngOnInit(): void {
    this.createReactiveForms();
    console.log("UserDetails",this.userDetails)
  }

  createReactiveForms(){
    this.tasks = this.fb.group({
      szTaskName:['',Validators.required]
    }) 
  }
  getErrorMessage() {
    if (this.tasks?.get(['szTaskName'])?.hasError('required')) {
      return '*Please Enetr a valid Task Name';
    }

    return this.tasks?.get(['szTaskName'])?.hasError('szTaskName') ? 'Please Enetr a valid Task Name' : '';
  }
  
  get f (){
    return this.tasks?.get(['szTaskName']);
  }

  onUserSubmit(){
   
    let parmsData= {
      intUserId:this.userDetails.id,
      szTask:this.f?.value
    }
    console.log("UserDetailssssparmsData",this.elRef)
   if(this.tasks.valid){

    this.taskManagement.addNewTask(parmsData)
    .subscribe((res)=>{
      this.dialogRef.close();
      console.log("Response From Api",res)
      
    })

  }
  }

 
}
