import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Task[] = [
    {id: 't1', title: 'Projekat iz Mobilnog racunarstva', description: 'Projekat zavrsiti do 1. juna', imgUrl: 'https://i.pinimg.com/736x/ac/c2/9e/acc29eb7588b23d2cf548e32eff5ce9c.jpg'},
    {id: 't2', title: 'Kolokvijum iz Projektovanja softvera', description: 'Kolokvijum spremiti do petka', imgUrl: 'https://i.pinimg.com/564x/bc/89/7c/bc897c914c753731b1ac2060f784b836.jpg'}
  ];

  //constructor() { }

  getTask(id: string){
    return this.tasks.find((t) => t.id === id);
  }
}
