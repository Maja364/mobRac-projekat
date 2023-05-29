import { Component, OnInit } from '@angular/core';
import { Task } from '../../task.model';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {

  task: Task = {id: 't1', title: 'Projekat iz Mobilnog racunarstva', description: 'Projekat zavrsiti do 1. juna', imgUrl: 'https://i.pinimg.com/736x/ac/c2/9e/acc29eb7588b23d2cf548e32eff5ce9c.jpg',userId:'xx'};

  constructor(private route: ActivatedRoute, private tasksService: TasksService) { }

  ngOnInit() {
     this.route.paramMap.subscribe(paramMap => {
      this.task = this.tasksService.getTask(paramMap.get('taskId')!)!;
    }) 
  }


}
