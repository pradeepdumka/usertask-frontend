import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interface/user";

@Injectable({
    providedIn: 'root',
})

export class TasManagementServices{

    baseURL : string ="http://localhost:3100/";
    constructor(private http : HttpClient){}
   
      getAllUserWithTask(): Observable<any> {
        return this.http.get<any>(`${this.baseURL}api/v1/getUser`)
      }
     
      addNewUser(person:User): Observable<any> {
         
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(person);
        return this.http.post(`${this.baseURL}api/v1/addUser`, body,{'headers':headers})
      }


      addNewTask(task:any): Observable<any> {
         
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(task);
        return this.http.post(`${this.baseURL}api/v1/addTasks`, body,{'headers':headers})
      }

      deleteUserWithTaskDetails(parms:any): Observable<any> {

        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(parms);
        return this.http.post(`${this.baseURL}api/v1/deleteUser`, body,{'headers':headers})
      }

      updateUser(parms:any): Observable<any> {
  
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(parms);
        return this.http.put(`${this.baseURL}api/v1/updateUser`, body,{'headers':headers})
      }

      updateDrangDropData(parms:any): Observable<any> {
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(parms);
        return this.http.post(`${this.baseURL}api/v1/addTasks`, body,{'headers':headers})
      }

      removePreUserData(parms:any): Observable<any> {
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(parms);
 
        return this.http.post(`${this.baseURL}api/v1/deleteTask`, body,{'headers':headers})
      }

      updateTaskById(parms:any): Observable<any> {
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(parms);
 
        return this.http.put(`${this.baseURL}api/v1/updateTask`, body,{'headers':headers})
      }



}
