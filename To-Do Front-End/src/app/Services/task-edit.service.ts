import { Injectable } from '@angular/core';
import { TokenService } from './Login/token.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TASK } from '../ModelClass/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskEditService {

  constructor(private HTTP:HttpClient,private jwtToken:TokenService) {}
  editTasksUrl:string= "http://localhost:9000/api/v2/user/updateTask/'";
  getTomorrowTasksUrl:string= "http://localhost:9000/api/v3/tomorrow";
 
 
  getTasks(id?: number): Observable<TASK[]> {
    const token = this.jwtToken.getheader();
    const a = {headers:token}
    let x= this.HTTP.get<TASK[]>(`${this.getTomorrowTasksUrl}/${id}`,a);
    return x;
     }
    //  updateTask( id?: number): Observable<any> {
    //   return this.HTTP.put(${this.editTasksUrl} + `task/${id}`);
    // }
}
