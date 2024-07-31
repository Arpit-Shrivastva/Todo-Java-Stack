import { MatTableDataSource } from '@angular/material/table';
import { GetArchivedService } from '../Services/TasksService/get-archived.service';
import { TASK } from '../ModelClass/Task';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DeleteTaskService } from '../Services/TasksService/delete-task.service';
import { CompletionArchiveService } from '../Services/TasksService/completion-archive.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-archived-tasks',
  templateUrl: './archived-tasks.component.html',
  styleUrls: ['./archived-tasks.component.css']
})
export class ArchivedTasksComponent implements OnInit {
  message: string = '';
  tasks: TASK[] = [];
  displayedColumns: string[] = ['taskHeading', 'dueDate', 'dueTime', 'priorityLevel', 'taskContent', 'deleteTask'];

  dataSource: MatTableDataSource<TASK>;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(private archiveService: GetArchivedService, private router: Router, private deleteService: DeleteTaskService, private archiveComplete: CompletionArchiveService) {
    this.dataSource = new MatTableDataSource<TASK>([]);
  }

  isTaskCompleted(task: TASK): boolean {
    return task.isCompleted;
  }

  ngOnInit(): void {
    this.archiveService.getTasks().subscribe(
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

  // markTaskAsCompleted(taskId: number) {
  //   this.archiveComplete.markTaskAsCompleted(taskId).subscribe(
  //     (response) => {
  //       console.log('Task marked as completed', response);
  //     },
  //     (error) => {
  //       console.error('Error marking task as completed', error);
  //     }
  //   );
  // }
  onIsCompleteChange(event: any, task: TASK) {
    const isCompleted = event.value;
    if (isCompleted !== task.isCompleted) {
      task.isCompleted = isCompleted;
    }
  }
  markAsCompleted(taskID: number) {
  //   const isComplete = true;
  
  //   this.archiveComplete.markTaskAsCompleted(taskID, isComplete).subscribe(
  //     (response: any) => {
  //       console.log('Task marked as completed:', response);
  
  //       const task = this.Tasks.find(t => t.taskID === taskID);
  //       if (task) {
  //         task.isCompleted = true;
  //         }
  //     },
  //     (error: any) => {
  //       console.error('Error updating task completion', error);
  //     }
  //   );
  // }
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
}