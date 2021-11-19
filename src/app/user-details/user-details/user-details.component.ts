import { Component,   OnInit  } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


import { TasManagementServices } from 'src/app/services/task-management.services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskModelComponent } from 'src/app/popup-model/task-model/task-model.component';
import { ConfirmationComponent } from 'src/app/popup-model/confirmation/confirmation.component';
import { ToastRef, ToastrService } from 'ngx-toastr';



 

 
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
      private toster :ToastrService
    ){
      
    }

   ngOnInit(): void {
    const dilogConfig = new MatDialogConfig();
    dilogConfig.disableClose=false;
    dilogConfig.autoFocus=true;
    dilogConfig.width="60%"
    this.getAllUserDetails();
  }
  
   /**
    * Below Method are  used for get all the user and there task 
    * 
    */

  getAllUserDetails(){
    this.taskManagement.getAllUserWithTask().subscribe((res)=>{
        if(res.status){
          this.board = res.data;
          console.log(this.board)
          this.board.forEach((element:any) => {
            element['isEdit'] = false;
              element.arTaskDetails.forEach((task:any) => {
                task['isEditTask']= false
              });
          });
          this.ardragId=this.board.map((res:any)=>{
            return   res.id.toString();
          })
         
        }
      })
  }

 
    /**
    * Below Method are  used for get all the user drag& drop functionality
    * 
    */
  public dropGrid(event: CdkDragDrop<string[]>): void {
    console.log(event.item.data);
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let objUpdateToContainer={
        szTask:event.item.data.szTask,
        intUserId:event.container.id
      }
      let objRemoveFromPrevUser={
        id:event.item.data.id,
        intUserId:event.item.data.intUserId
      }
      this.updateDrangAndDropContainer(objUpdateToContainer,objRemoveFromPrevUser);
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }

 
  }

   /**
    * Add New Task function Start
    * 
    */
      onTaskCreate(userId:any){

          const dialogRef =this.dialog.open(TaskModelComponent,{
            data:{id:userId},
          });

          dialogRef.afterClosed().subscribe(result => {
            this.toster.success("New Task  Added successfully.")
            this.getAllUserDetails()
          });
      }
   /**
    * Add New Task function End
    * 
    */



   /**
    * Delete User with all task start
    * 
    */
  deleteUserWithTask(data:any){
     const dialogRef =this.dialog.open(ConfirmationComponent,{
      data:{id:data.id ,userName:data.userName},
     });
     dialogRef.afterClosed().subscribe(result => {
       
      if(result.status == 200){
        this.toster.success("User Removed successfully.");
      }
      this.getAllUserDetails();
    });
    
   
  }

  /**
  * Delete User with all task end
  * 
  */

  //##############################
  //Create editable fields for user
  //##############################
  setTitleEdit(data:any) {
     data.isEdit=true;
  }

  //##############################
  //Update User Details
  //##############################
  updateUser(data:any){
   let parms ={id:data.id,szUserName:data.szUserName}
   this.taskManagement.updateUser(parms).subscribe((res)=>{
      //console.log(res);
      if(res.status == 200){
        this.toster.success("User Updated successfully.");
        data.isEdit=false;
        
      }else{
        data.isEdit=true;
        this.toster.error("Something goes  wrong .")
      }
      
   })
  }


   //##############################
   //When Move any User Task to other
  //so blow method heandle for there 
  // data to database for move
  //one user to other
  //##############################
  updateDrangAndDropContainer(obj:any,objPreUser:any){
    this.taskManagement.updateDrangDropData(obj).subscribe((res)=>{
        console.log(res);
        if(res.status == 200){
            this.removePreviousTaskFromPreviousUser(objPreUser)
        }
    })
  }

  removePreviousTaskFromPreviousUser(objPreUser:any){
    this.taskManagement.removePreUserData(objPreUser).subscribe((res)=>{
      console.log(res);
      if(res.status == 200){
          this.toster.success("Assign Task Successfully to other user .");
      }else{
         this.toster.error("Something goes wrong plz check!!");
      }
    })
  }


  //below Method Are Used for editable task field  
  editCurrentTast(item:any){
    item.isEditTask = true;
  }

   //For Update task By ID
  updateCurrentTast(item:any){
    console.log(item)
    let params = {
      id:item.id,
      szTask:item.szTask,
      intUserId:item.intUserId
    }
    item.isEditTask = false;
    this.taskManagement.updateTaskById(params).subscribe((res:any)=>{
      console.log("res",res )
      if(res.status == 200){
         this.toster.success("Task Updated Successfully.")
      }else{
        this.toster.error("Something goes wrong.")
      }   
    })
  }
   
}
