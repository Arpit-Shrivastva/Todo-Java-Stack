import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TASK } from '../ModelClass/Task';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DeleteTaskService } from '../Services/TasksService/delete-task.service';
import { GetCompletedTasksService } from '../Services/TasksService/get-completed-tasks.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css']
})
export class CompletedTasksComponent {

  message: String='' ;

  displayedColumns: string[] = ['taskHeading', 'dueDate', 'dueTime', 'priorityLevel', 'taskContent','deleteTask'];

    dataSource: MatTableDataSource<TASK>;
    @ViewChild(MatSort)
  sort: MatSort = new MatSort;
    constructor(private completedService: GetCompletedTasksService, private router: Router,private deleteService:DeleteTaskService) {
      this.dataSource = new MatTableDataSource<TASK>([]); 
    }

  
    ngOnInit(): void {
      this.completedService.getTasks().subscribe(
        (data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;


        },

        (error) => {
          if (error.error && error.error.message === 'You have no tasks for this day') {
            this.message = `You have no Archived Task`;
          } else {
            this.message = 'An error occurred while fetching tasks.';
          }
        }
      
      );

  }
  deleteTask(taskID: number) {
    this.deleteService.deleteTask(taskID).subscribe(
      (response) => {
        console.log('Task deleted successfully', response);
      },
      (error) => {
        console.error('Error deleting task', error);
      }
    );
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
}
