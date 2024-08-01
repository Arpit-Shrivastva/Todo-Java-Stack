import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TokenService } from '../Login/token.service';

@Injectable({
  providedIn: 'root'
})
export class TodayHeadEditService {

  constructor(private HTTP: HttpClient, private jwtToken: TokenService) { }
  editUrl: string = "http://localhost:9000/api/v2/user/updateTaskHeading/task/taskID/heading";

  updateTaskHeading(taskID: number, newHeading: string): Observable<any> 
  {
    const token = this.jwtToken.getheader();
    const a = { headers: token };
    const url = this.editUrl.replace("taskID", taskID.toString());
    return this.HTTP.put(url, newHeading, a);
  }

}
