import { Component,   OnInit, Renderer2,  } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';


import { TasManagementServices } from 'src/app/services/task-management.services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskModelComponent } from 'src/app/popup-model/task-model/task-model.component';
import { ConfirmationComponent } from 'src/app/popup-model/confirmation/confirmation.component';

 

 
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit  {
 
  
  isShowForm:boolean=false;
  board :any;
  ardragId:any = []
  isADDNewUser :number=0;
  isEditing:boolean=true;

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
          this.board.forEach((element:any) => {
            element['isEdit'] = false;
          });
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


  deleteUserWithTask(data:any){
     const dialogRef =this.dialog.open(ConfirmationComponent,{
      data:{id:data.id ,userName:data.userName},
     });
     dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      //this.dialogValue = result.data;
      this.getAllUserDetails();
    });
    
   
  }

   
  setTitleEdit(data:any) {
     data.isEdit=true;
  }

  updateUser(data:any){
   let parms ={id:data.id,szUserName:data.szUserName}
   this.taskManagement.updateUser(parms).subscribe((res)=>{
      console.log(res);
      if(res.status == 200){
        data.isEdit=false;
      }else{
        data.isEdit=true;
      }
      
   })
  }
 

}
