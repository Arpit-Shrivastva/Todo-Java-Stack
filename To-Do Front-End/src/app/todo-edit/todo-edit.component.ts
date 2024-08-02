import { Component } from '@angular/core';
import { NgModule, OnInit } from '@angular/core';
import { TokenService } from '../Services/Login/token.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms'
import { TaskEditService } from '../Services/task-edit.service';
import { TASK } from '../ModelClass/Task';
import { GetTomorrowTasksService } from '../Services/Tomorrowtasks/get-tomorrow-tasks.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  Tasks : TASK[]=[];
  message:string='';

  tasks$: Observable<TASK[]> | undefined;
  task_form: FormGroup | undefined;

  constructor(private tomorrowTaskService: GetTomorrowTasksService, private form_builder: FormBuilder,private route: ActivatedRoute) { }

  ngOnInit(): void {
  //   this.route.paramMap.subscribe((paramMap: ParamMap) => {
  //     var todoId: String = paramMap.get('id');
  //     console.log(todoId);
  //     alert(todoId);
  //     this.Tasks =this.tomorrowTaskService.getdoTasks(todoId);
  // })
}
 



  // onSubmit() {
  //   // Create the Task.
  //   // this.taskEditService.putTasks(this.task_form.value)
  //   //   .subscribe(
  //   //     (response) => {
  //   //       console.log(response);
  //   //       this.getTasks();
  //   //     }
  //   //   )
  // }
}
