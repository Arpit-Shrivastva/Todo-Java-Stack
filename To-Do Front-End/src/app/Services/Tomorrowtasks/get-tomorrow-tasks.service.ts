import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TASK } from 'src/app/ModelClass/Task';
import { TokenService } from '../Login/token.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetTomorrowTasksService {
  // todo!: TASK[];
  constructor(private HTTP:HttpClient,private jwtToken:TokenService) {}
  getTomorrowTasksUrl:string= "http://localhost:9000/api/v3/tomorrow";
  getTasks():Observable<TASK[]>
  {
    const token = this.jwtToken.getheader();
    const a = {headers:token}

    console.log(this.getTomorrowTasksUrl);
    console.log("service");
    return this.HTTP.get<TASK[]>(`${this.getTomorrowTasksUrl}`,a);
  }
  // getdoTasks(id:String){
  //   return this.todo.find(t=>t.id==id)
  // }
}
