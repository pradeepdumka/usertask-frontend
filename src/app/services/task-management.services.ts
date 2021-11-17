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
        console.log(`${this.baseURL}api/v1/addUser`)

        return this.http.get<any>(`${this.baseURL}api/v1/getUser`)
      }
     
      addNewUser(person:User): Observable<any> {
        console.log(`${this.baseURL}api/v1/addUser`)
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(person);
        console.log(body)
        return this.http.post(`${this.baseURL}api/v1/addUser`, body,{'headers':headers})
      }


      addNewTask(task:any): Observable<any> {
        console.log(`${this.baseURL}api/v1/addTasks`)
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(task);
        console.log(body)
        return this.http.post(`${this.baseURL}api/v1/addTasks`, body,{'headers':headers})
      }

      deleteUserWithTaskDetails(parms:any): Observable<any> {
        console.log(`${this.baseURL}api/v1/deleteUser`)
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(parms);
        console.log(body)
        return this.http.post(`${this.baseURL}api/v1/deleteUser`, body,{'headers':headers})
      }
}
