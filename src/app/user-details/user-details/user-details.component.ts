import { Component,   OnInit  } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


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
        //  console.log(this.board)
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

 
 
  public dropGrid(event: CdkDragDrop<string[]>): void {
    console.log(event.item.data);
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
  }

  public drop(event: CdkDragDrop<string[]>): void {
    //console.log("this.dropped WWW",event)
    if (event.previousContainer === event.container) {
      console.log("this.dropped moveItemInArray",event.item.data)
      console.log("this.dropped moveItemInArray",event.container.data)
      console.log("this.dropped moveItemInArray",event.previousIndex)
      console.log("this.dropped moveItemInArray",event.currentIndex)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log("this.dropped transferArrayItem",event.item.data)
      // console.log("this.dropped previousContainer",event.previousContainer.data)
      // console.log("this.dropped container",event.container.data)
      // console.log("this.dropped PI",event.previousIndex)
      // console.log("this.dropped CI",event.currentIndex)
      console.log("this.dropped Update TO",event.container.id)
      console.log("this.dropped Update From",event.previousContainer.id)
      let objUpdateToContainer={
        szTask:event.item.data.szTask,
        intUserId:event.container.id
      }
      let objRemoveFromPrevUser={
        id:event.item.data.id,
        intUserId:event.item.data.intUserId
      }
      this.updateDrangAndDropContainer(objUpdateToContainer,objRemoveFromPrevUser);
      console.log(objUpdateToContainer)
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
          
      }
    })
  }

  editCurrentTast(item:any){
    item.isEditTask = true;
  }
  updateCurrentTast(item:any){
    console.log(item)
    let params = {
      id:item.id,
      szTask:item.szTask,
      intUserId:item.intUserId
    }
    item.isEditTask = false;
    this.taskManagement.updateTaskById(params).subscribe((res:any)=>{
           if(res.staus == 200){
           
           }    
    })
  }
   
}
