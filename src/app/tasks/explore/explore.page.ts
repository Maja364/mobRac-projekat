import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit, OnDestroy {

 /*  tasks: Task[] = [
    {id: 't1', title: 'Projekat iz Mobilnog racunarstva', description: 'Projekat zavrsiti do 1. juna', imgUrl: 'https://i.pinimg.com/736x/ac/c2/9e/acc29eb7588b23d2cf548e32eff5ce9c.jpg'},
    {id: 't2', title: 'Kolokvijum iz Projektovanja softvera', description: 'Kolokvijum spremiti do petka', imgUrl: 'https://i.pinimg.com/564x/bc/89/7c/bc897c914c753731b1ac2060f784b836.jpg'}
  ]; */

  tasks: Task[];

  constructor(private tasksService: TasksService) {
    console.log('constructor');
    this.tasks = this.tasksService.tasks;
  }

  ngOnInit() {
    console.log('ngOnIt');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

}