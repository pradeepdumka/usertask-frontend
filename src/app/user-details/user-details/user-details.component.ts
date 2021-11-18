import { Component,  ElementRef,  HostListener,  OnInit, Renderer2, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';


import { TasManagementServices } from 'src/app/services/task-management.services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskModelComponent } from 'src/app/popup-model/task-model/task-model.component';
import { ConfirmationComponent } from 'src/app/popup-model/confirmation/confirmation.component';
import { FormControl, Validators } from '@angular/forms';
 

 
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit  {
  @ViewChild('editUser') editUser!: ElementRef;
  @ViewChild('edit') edit!: ElementRef;
  
  isShowForm:boolean=false;
  board :any;
  ardragId:any = []
  isADDNewUser :number=0;
  isEditing:boolean=true;
  szUserName=new FormControl('',Validators.required);

  constructor( 
      private taskManagement:TasManagementServices,
      private dialog: MatDialog,
      private renderer: Renderer2
    ){
      
    }

  public ngOnInit(): void {
    const dilogConfig = new MatDialogConfig();
    dilogConfig.disableClose=false;
    dilogConfig.autoFocus=true;
    dilogConfig.width="60%"
    this.getAllUserDetails();



  }
  
  getAllUserDetails(){
    this.taskManagement.getAllUserWithTask().subscribe((res)=>{
        if(res.status){
          this.board = res.data;
          console.log(this.board)
        
          this.ardragId=this.board.map((res:any)=>{
            return   res.id.toString();
          })
         
        }
      })
  }
  
 
  public dropGrid(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }


  onTaskCreate(userId:any){

 
    const dialogRef =this.dialog.open(TaskModelComponent,{
      data:{id:userId},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      //this.dialogValue = result.data;
      this.getAllUserDetails()
    });
  }


  deleteUserWithTask(userId:number,userName:string){
     let req={id:userId}
     const dialogRef =this.dialog.open(ConfirmationComponent,{
      data:{id:userId ,userName:userName},
     });
     dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      //this.dialogValue = result.data;
      this.getAllUserDetails();
    });
    
   
  }

   
  setTitleEdit(column:any,userName:string) {

    this.szUserName.patchValue(userName);
  }

  updateUser(userId:number){
    if(this.szUserName.status == 'VALID'){
      console.log("HHHH",this.szUserName)
    }
   
  }
 

}
