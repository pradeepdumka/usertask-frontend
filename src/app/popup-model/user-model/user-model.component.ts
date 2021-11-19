 
import { Component, OnInit ,ViewEncapsulation } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog ,MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TasManagementServices } from 'src/app/services/task-management.services';
@Component({
  selector: 'app-user-model',
  templateUrl: './user-model.component.html',
  styleUrls: ['./user-model.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserModelComponent implements OnInit {

  users !: FormGroup
 
  constructor(
    private fb: FormBuilder,
    private taskManagement:TasManagementServices,
    private router:Router,
    private toster : ToastrService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserModelComponent>,
    ) { }

  ngOnInit(): void {
    this.createReactiveForms();
  }

  createReactiveForms(){
    this.users = this.fb.group({
      szUserName:['']
    }) 
  }
  getErrorMessage() {
    if (this.users?.get(['szUserName'])?.hasError('required')) {
      return '*Please Enetr a valid User Name';
    }

    return this.users?.get(['szUserName'])?.hasError('szUserName') ? 'Please Enetr a valid User Name' : '';
  }
  
  get f (){
    return this.users?.get(['szUserName']);
  }

  onUserSubmit(){
    this.taskManagement.addNewUser(this.users.value)
    .subscribe((res)=>{
      this.dialogRef.close();
    
      window.location.reload()
      this.toster.success("New User added successfully.")
    })
  }



}
