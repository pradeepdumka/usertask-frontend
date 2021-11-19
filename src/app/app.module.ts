import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { UserDetailsComponent } from './user-details/user-details/user-details.component';
import { UserModelComponent } from './popup-model/user-model/user-model.component';
import { TaskModelComponent } from './popup-model/task-model/task-model.component';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ConfirmationComponent } from './popup-model/confirmation/confirmation.component'; 
import { ToastrModule } from 'ngx-toastr';
 

 
@NgModule({
  declarations: [
    AppComponent,
    UserModelComponent,
    TaskModelComponent,
    UserDetailsComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    DragDropModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent],
  entryComponents:[UserModelComponent,TaskModelComponent,ConfirmationComponent]
})
export class AppModule { }
